<script>
import couponForm from './coupon-form'
import set from 'lodash/set'
import isPast from '@lib/utils/date-is-past'

export default {
  name: 'CouponCreateEditModal',
  components: {
    couponForm,
  },
  inheritAttrs: false,
  props: {
    coupon: {
      type: Object,
      default: () => ({}),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        name: null,
        code: null,
        start_at: null,
        end_at: null,
        validity_period: null,
        discount_type: 'fixed_amount',
        amount: null,
      },
    }
  },
  computed: {
    formatedValidityPeriod() {
      const period = this.form.validity_period
      return period ? `P${period}M` : ''
    },
  },
  created() {
    if (this.edit) {
      this.form = { ...this.coupon }
    }
  },
  methods: {
    updateCouponValue({ fieldName, newVal }) {
      set(this.form, fieldName, newVal )
    },
    async onSave() {
      const { form, edit } = this

      if (!this.validateAll().some(item => item === false)) {
        const request = {
          method: edit ? 'put' : 'post',
          url: edit ? `/coupons/${this.coupon.id}` : '/coupons',
          data: {},
        }

        if (edit) {
          request.data = {
            name: form.name,
            end_at: form.end_at,
          }
          if (!isPast(form.start_at)) {
            request.data[form.discount_type] = form.amount
          }
        } else {
          request.data = {
            code: form.code,
            [form.discount_type]: form.amount,
            name: form.name,
            start_at: form.start_at,
            end_at: form.end_at,
            validity_period: this.formatedValidityPeriod,
          }
        }

        const [error, response] = await this.$api[request.method](request.url, request.data )

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: this.edit ? 'Changes saved successfully' : `Coupon created.`,
          })
          this.$emit('update:visible', false)
          this.$emit('updated')
        } else if (error) {
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
        }
      }
    },
    validateAll() {
      const result = []
      this.$refs.form.$children[0].validate( valid => {
        result.push(valid)
      })
      return result
    },
  },
}
</script>

<template>
  <el-dialog
    v-bind="$attrs"
    :title="edit ? 'Edit Coupon' : 'Create Coupon'"
    :custom-class="$style.wrapper"
    v-on="$listeners"
  >
    <coupon-form
      ref="form"
      :edit="edit"
      :coupon="form"
      @changeValue="updateCouponValue"
    />
    <el-button
      type="primary"
      :class="$style.saveButton"
      @click="onSave"
    >
      Save
    </el-button>
  </el-dialog>
</template>

<style lang="scss" module>
.wrapper {
  width: 34rem;
  max-width: 34rem !important;
}

.radios {
  display: flex;
  align-items: center;
  width: 100%;

  &:before {
    content: none;
  }

  :global {
    .el-form-item__label {
      margin-right: 2rem;
    }
  }
}

.currencySelect {
  :global {
    .el-input {
      width: 80px;
    }
  }
}

.discountTypeSign {
  width: 38px;
  padding: 0;
}

.saveButton {
  display: block;
  width: 15rem;
  margin: 2rem auto 0;
}
</style>
