<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'NewPaymentMethodForm',
  directives: {
    mask,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tab: 'card',
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        number: [
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
        ],
        cvv: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        bsb: [
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
    changeValue(fieldName, type, newVal) {
      this.$emit('changeValue', { fieldName, type, newVal })
    },
    onSave() {
      this.$refs[this.tab].validate(valid => {
        if (valid) {
          this.$emit('save')
        }
      })
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <el-tabs
      v-model="tab"
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
              :value="form.card.name"
              @input="changeValue('name', 'card', $event)"
            />
          </el-form-item>

          <el-form-item
            label="Card No"
            prop="number"
          >
            <el-input
              v-mask="['#### #### #### ####']"
              placeholder="---- ---- ---- ----"
              :value="form.card.number"
              @input="changeValue('number', 'card', $event)"
            />
            <div :class="$style.cardLogos">
              <div :class="$style.logoWrapper">
                <img
                  src="/img/visa_logo.png"
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
                v-mask="['##/##']"
                :value="form.card.expiry"
                @input="changeValue('expiry', 'card', $event)"
              />
            </el-form-item>

            <el-form-item
              label="CVV"
              prop="cvv"
            >
              <el-input
                v-mask="['###']"
                :value="form.card.cvv"
                @input="changeValue('cvv', 'card', $event)"
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
              :value="form.account.name"
              @input="changeValue('name', 'account', $event)"
            />
          </el-form-item>

          <div class="united-field">
            <el-form-item
              label="BSB"
              prop="bsb"
            >
              <el-input
                :value="form.account.bsb"
                @input="changeValue('bsb', 'account', $event)"
              />
            </el-form-item>

            <el-form-item
              label="Account No"
              prop="number"
            >
              <el-input
                :value="form.account.number"
                @input="changeValue('number', 'account', $event)"
              />
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      :class="$style.saveButton"
      data-test="save"
      @click="onSave"
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
