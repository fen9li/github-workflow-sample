<script>
import { mask } from 'vue-the-mask'
import { mapActions } from 'vuex'

export default {
  name: 'NewPaymentMethodForm',
  directives: {
    mask,
  },
  props: {
    customer: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      processing: false,
      type: 'card',
      form: {
        account: {
          name: null,
          bsb: null,
          number: null,
        },
        card: {
          name: null,
          number: null,
          expiry: null,
          cvc: null,
        },
      },
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        expiry: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
          {
            len: 5,
            message: 'Expiry field must be in format 11/11',
            trigger: 'blur',
          },
        ],
        cvc: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
          {
            len: 3,
            message: 'CVV must be 3 digits',
            trigger: 'blur',
          },
        ],
        bsb: [
          {
            len: 6,
            message: 'BSB must be 6 digits',
            trigger: 'blur',
          },
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    ...mapActions('payment', ['addPaymentMethod']),
    onSubmit() {
      this.$refs[this.type].validate(valid => {
        if (valid) {
          this.processing = true

          const { form, customer, type } = this
          let requestData

          if(type === 'card') {
            requestData = {
              type,
              card: {
                expiry: {
                  month: form.card.expiry.slice(0,2),
                  year: `20${form.card.expiry.slice(3)}`,
                },
                name: form.card.name,
                number: form.card.number.replace(/\s/g, ''),
              },
              token: customer.eoneo_pay_api_key,
            }
          } else if(type === 'account') {
            requestData = {
              type,
              account: {
                prefix: form.account.bsb,
                name: form.account.name,
                number: form.account.number.replace(/\s/g, ''),
              },
              token: customer.eoneo_pay_api_key
            }
          }

          this.addPaymentMethod(requestData).then(resp => {
            const [error, response] = resp

            if(error) {
              this.$notify({
                type: 'error',
                title: 'Error',
                message: error.message,
              })
              this.$refs[this.type].clearValidate()
              this.processing = false
            } else {
              this.addMethodToCustomer(response.token)
            }
          })
        }
      })
    },
    async addMethodToCustomer(token) {
      const [error, response] = await this.$api.post(`/customers/${this.customer.id}/tokens`, {
        token
      })

      this.processing = false

      if (error) {
        const violations = Object.keys(error.violations)
        violations.forEach(violation => {
          setTimeout(() => {
            this.$notify({
              type: 'error',
              title: 'Error',
              message: `${violation}: ${error.violations[violation][0]}`,
            })
          }, 50)
        })
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Method added successfully`,
        })
        this.$emit('added', response.token)
      }
    }
  },
}
</script>

<template>
  <div :class="$style.root">
    <el-tabs
      v-model="type"
      stretch
    >
      <el-tab-pane
        label="Credit/Debit Card"
        name="card"
      >
        <el-form
          ref="card"
          :model="form.card"
          class="modal-form"
          label-position="top"
          :rules="rules"
        >
          <el-form-item
            label="Card Holder Name"
            prop="name"
          >
            <el-input
              v-model="form.card.name"
            />
          </el-form-item>

          <el-form-item
            label="Card No"
            prop="number"
            :rules="[
              {required: true, message: 'This field is required', trigger: 'blur'},
              {len: 19, message: 'Card number must be 16 digits', trigger: 'blur'}
            ]"
          >
            <el-input
              v-model="form.card.number"
              v-mask="['#### #### #### ####']"
              placeholder="---- ---- ---- ----"
            />
            <div :class="$style.cardLogos">
              <div :class="$style.logoWrapper">
                <img
                  src="/img/visaelectron_logo.png"
                  alt="visa"
                  :class="$style.logo"
                >
              </div>
              <div :class="$style.logoWrapper">
                <img
                  src="/img/mastercard_logo.png"
                  alt="mastercard"
                  :class="$style.logo"
                >
              </div>
              <div :class="$style.logoWrapper">
                <img
                  src="/img/amex_logo.png"
                  alt="amex"
                  :class="$style.logo"
                >
              </div>
            </div>
          </el-form-item>

          <div class="united-field">
            <el-form-item
              label="Expiry"
              prop="expiry"
            >
              <el-input
                v-model="form.card.expiry"
                v-mask="['##/##']"
                :value="form.card.expiry"
                placeholder="MM/YY"
              />
            </el-form-item>

            <el-form-item
              label="CVV"
              prop="cvc"
            >
              <el-input
                v-model="form.card.cvc"
                v-mask="['###']"
              />
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane
        label="Bank Account"
        name="account"
      >
        <el-form
          ref="account"
          :model="form.account"
          class="modal-form"
          label-position="top"
          :rules="rules"
        >
          <el-form-item
            label="Account Name"
            prop="name"
          >
            <el-input
              v-model="form.account.name"
            />
          </el-form-item>

          <div class="united-field">
            <el-form-item
              label="BSB"
              prop="bsb"
            >
              <el-input
                v-model="form.account.bsb"
                v-mask="['######']"
              />
            </el-form-item>

            <el-form-item
              label="Account No"
              prop="number"
              :rules="[
                {required: true, message: 'This field is required', trigger: 'blur'},
                {len: 9, message: 'Account number must be 9 digits', trigger: 'blur'}
              ]"
            >
              <el-input
                v-model="form.account.number"
                v-mask="['#########']"
              />
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      :class="$style.saveButton"
      :loading="processing"
      data-test="save"
      @click="onSubmit"
    >
      Save
    </el-button>
  </div>
</template>

<style lang="scss" module>
.root {

  :global {
    .el-tabs__content {
      margin-top: 2.5rem;
    }
  }
}

.cardLogos {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
}

.logoWrapper {
  width: 1.9rem;
  margin-left: 0.4rem;
}

.logo {
  width: 100%;
}

.saveButton {
  display: block;
  width: 15rem;
  margin: 2rem auto 0;
}
</style>
