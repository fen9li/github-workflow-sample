<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'CustomerCreate',
  directives: {
    mask,
  },
  inheritAttrs: false,
  data() {
    return {
      dialogVisible: false,
      form: {
        couponName: null,
        couponCode: null,
        effectiveStartDate: null,
        endDate: null,
        validatyPeriod: null,
        discountType: '%',
        amount: '',
      },
      rules: {
        couponName: [
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
        effectiveStartDate: {
          required: true,
        },
      },
    }
  },
  methods: {
    getPaymentSysLogo() {
      // eslint-disable-next-line max-len
      return require(`~/assets/images/${this.cardDetails.paymentsSystem}_logo.png`)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Coupon created.',
          })
          this.$emit('update:visible', false)
        } else {
          return false
        }
      })
    },
  },
}
</script>

<template>
  <el-dialog
    v-bind="$attrs"
    title="Create coupon"
    v-on="$listeners"
  >
    <div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="180px"
        label-position="left"
      >
        <el-form-item
          label="Coupon Name"
          prop="couponName"
        >
          <el-input
            v-model="form.couponName"
            placeholder="Name"
          />
        </el-form-item>

        <el-form-item label="Coupon Code">
          <el-input
            v-model="form.couponCode"
            placeholder="Reference"
          />
        </el-form-item>

        <el-form-item
          label="Effective Start Date"
          prop="effectiveStartDate"
        >
          <el-select v-model="form.effectiveStartDate">
            <el-option
              value="1"
              label="Start Date 1"
            />
            <el-option
              value="2"
              label="Start Date 2"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="End Date">
          <el-select v-model="form.endDate">
            <el-option
              value="1"
              label="End Date 1"
            />
            <el-option
              value="2"
              label="End Date 2"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Validity Period">
          <el-select v-model="form.validityPeriod">
            <el-option
              value="1"
              label="Period 1"
            />
            <el-option
              value="2"
              label="Period 2"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Discount type"
        >
          <el-radio-group
            v-model="form.discountType"
            class="modal__radios"
          >
            <el-radio
              label="%"
            >
              Percentage
            </el-radio>
            <el-radio
              label="$"
            >
              Dollar Value
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="Amount"
          prop="amount"
        >
          <div
            prop="amount"
            class="amount-form-item"
          >
            <el-form-item
              prop="amount"
            >
              <el-input
                v-model="form.amount"
                v-mask="[
                  '#.##',
                  '##.##',
                  '###.##',
                  '####.##',
                  '#####.##'
                ]"
                placeholder="$0.00"
              >
                <template #append>
                  {{ form.discountType }}
                </template>
              </el-input>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>

      <div
        slot="footer"
        class="modal__footer"
      >
        <el-button
          type="primary"
          class="wide-button"
          @click="onSubmit"
        >
          Create Coupon
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>

.amount {
  display: flex;

  :global {
    .el-form-item {
      width: 100%;
    }
    .el-select .el-input {
      width: 60px;
    }
  }
}

</style>
