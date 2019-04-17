<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'CustomerVPOSModal',
  directives: {
    mask,
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        chargeFor: 'adhoc',
        amount: {
          value: null,
          currency: 'aud',
        },
        receiptEmail: '',
        statementDescriptor: '',
      },
      // eslint-disable-next-line max-len
      // Temporary added as data, later likely would be props obj after real data implementation
      customerName: 'Mary Gregov',
      cardDetails: {
        cardHolderName: 'Mary Gregov',
        cardNumber: '**** **** 9287',
        cardExpiry: '08/2020',
        paymentsSystem: 'mastercard',
      },
      rules: {
        chargeFor: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        amount: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        statementDescriptor: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
          {
            max: 22,
            message: '22 characters max',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  methods: {
    getPaymentSysLogo() {
      // eslint-disable-next-line max-len
      return require(`@assets/images/${this.cardDetails.paymentsSystem}_logo.png`)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.warn('submited', this.form)
        } else {
          console.warn('error submit')
          return false
        }
      })
    },
  },
}
</script>

<template>
  <div class="virtual-pos">
    <el-button
      type="primary"
      @click="dialogVisible = true"
    >
      Virtual POS
    </el-button>

    <el-dialog
      :visible.sync="dialogVisible"
      title="Virtual POS"
    >
      <div class="virtual-pos__body">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="180px"
          label-position="left"
        >
          <el-form-item
            label="Customer Name"
          >
            <span class="virtual-pos__form-customer-name">
              {{ customerName }}
            </span>
          </el-form-item>

          <el-form-item
            label="Charge for"
            prop="chargeFor"
          >
            <el-radio-group
              v-model="form.chargeFor"
              class="virtual-pos__form-charge"
            >
              <el-radio label="adhoc">
                Adhoc charge
              </el-radio>
              <el-radio label="subscription">
                Subscription Product
              </el-radio>
              <el-radio label="single">
                Single Product
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="Amount"
            prop="amount"
          >
            <div
              class="virtual-pos__form-amount"
              prop="amount"
            >
              <el-form-item
                prop="amount"
              >
                <el-input
                  v-model="form.amount.value"
                  v-mask="['$#.##', '$##.##', '$###.##']"
                  placeholder="$0.00"
                />
              </el-form-item>
              <el-select
                v-model="form.amount.currency"
              >
                <el-option
                  label="AUD"
                  value="aud"
                />
                <el-option
                  label="EUR"
                  value="eur"
                />
                <el-option
                  label="USD"
                  value="usd"
                />
              </el-select>
            </div>
          </el-form-item>

          <el-form-item
            label="Card Details"
          >
            <el-card class="virtual-pos__form-card-details">
              <div class="card-details__logo">
                <img
                  :src="getPaymentSysLogo()"
                  :alt="cardDetails.paymentSystem"
                >
              </div>
              <div class="card-details__name">
                {{ cardDetails.cardHolderName }}
              </div>
              <div class="card-details__number">
                {{ cardDetails.cardNumber }}
              </div>
              <div class="card-details__expiry">
                EXP {{ cardDetails.cardExpiry }}
              </div>
            </el-card>
          </el-form-item>

          <el-form-item
            :rules="[
              { type: 'email',
                message: 'Must be valid email address',
                trigger: ['blur', 'change'] }
            ]"
            label="Email Receipt"
            prop="receiptEmail"
          >
            <el-input
              v-model="form.receiptEmail"
              placeholder="email@email.ru"
            />
          </el-form-item>

          <el-form-item
            label="Statement Descriptor"
            prop="statementDescriptor"
          >
            <el-input
              v-model="form.statementDescriptor"
              placeholder="Max. 22 characters"
              suffix-icon="el-icon-warning"
              class="virtual-pos__form-descriptor"
            />
          </el-form-item>
        </el-form>

        <div
          slot="footer"
          class="virtual-pos__footer"
        >
          <el-button
            type="primary"
            @click="onSubmit"
          >
            Create payment
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.el-dialog {
  width: 33%;

  @media screen and(max-width: 768px) {
    width: 90%;
  }

  @media screen and(min-width: 768px) and (max-width: 1200px) {
    width: 60%;
  }

  @media screen and(min-width: 1200px) and (max-width: 1360px) {
    width: 40%;
  }

}

.el-dialog__header {
  padding: 35px 35px 0 35px;
  text-align: center;

  .el-dialog__title {
      font-size: 20px;
  }
}

.el-dialog__body {
  padding: 35px 40px;
}

.el-form-item__label {
  padding: 0;
  font-size: 16px;
}
.virtual-pos {
  &__form {

    &-charge {
      display: flex;
      flex-direction: column;

      .el-radio {
        margin: 5px 0;
      }
    }

    &-amount {
      display: flex;

      .el-form-item {
        width: 100%;
      }

      .el-select .el-input {
        width: 80px;
      }
    }

    &-customer-name {
      font-size: 16px;
      line-height: 16px;
    }

    &-card-details {
      width: 180px;
      background: linear-gradient(0deg, rgba(9,102,185,1) 25%,
       rgba(2,126,238,1) 89%);
      border-radius: 10px;

      .el-card__body {
        display: flex;
        flex-direction: column;
        padding: 15px 15px 15px 20px;
        color: #fff;

        .card-details {

          &__logo {
            align-self: flex-end;
            width: 30px;
            line-height:0;
              img {
                width: 100%;
              }
          }

          &__name {
            margin-bottom: 15px;
            line-height: 14px;
          }

          &__number, &__expiry {
            font-size: 11px;
            line-height: 11px;
          }

          &__number {
            margin-bottom: 8px;
          }
        }
      }
    }

    &-descriptor {
      .el-input__suffix {
        font-size: 18px;
        color: #4c91f8;
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
}
</style>
