<script>
import { datePickerFormat } from '@lib/utils/date-helper'
import get from 'lodash/get'
import { mask } from 'vue-the-mask'

export default {
  name: 'EditSubscriptionAnniversaryModal',
  directives: {
    mask,
  },
  props: {
    subscription: {
      type: Object,
      default: () => {},
    },
    customerName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      processing: false,
      datePickerFormat,
      form: {
        newDate: '',
      },
      rules: {
        newDate: [
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
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        this.processing = true
        const { newDate } = this.form

        const requestData = {
          frequency: get(this.subscription, 'current_frequency.frequency', null),
          product: {
            id: get(this.subscription, 'current_product.id', null),
          },
          start_at: newDate,
        }


        const [error,] = await this.$api.put(`/subscriptions/${this.subscription.id}/upgrade`, requestData)

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
            message: `Changes saved successfully`,
          })
          this.$emit('update:visible', false)
          this.$emit('updated')
        }
      }
    },
    validateAll() {
      const result = []
      this.$refs.form.validate( valid => {
        result.push(valid)
      })
      return result
    },
  },
}
</script>

<template>
  <el-dialog
    title="Edit Anniversary Date"
    :custom-class="$style.wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="modal-form"
      label-width="200px"
      label-position="top"
    >
      <el-form-item
        label="Customer"
      >
        <el-input
          :value="customerName"
          disabled
          data-test="customer"
        />
      </el-form-item>

      <div class="united-field">
        <el-form-item
          label="Current Anniversary Date"
          class="form-tooltip-field"
        >
          <el-date-picker
            v-mask="['##/##/####']"
            :value="subscription.next_billed_at"
            type="date"
            placeholder="DD/MM/YYYY"
            disabled
            format="dd/MM/yyyy"
            data-test="currentAnniversary"
          />
          <el-tooltip
            placement="right"
          >
            <div slot="content">
              <span>
                <b>Anchor date</b><br>
                A customer's first bill will be prorated from the
                start date of their subscription to the anchor date.
              </span>
            </div>
            <i class="el-icon-warning" />
          </el-tooltip>
        </el-form-item>

        <el-form-item
          label="New Anniversary Date"
          class="form-tooltip-field"
          prop="newDate"
        >
          <el-date-picker
            v-model="form.newDate"
            v-mask="['##/##/####']"
            type="date"
            placeholder="DD/MM/YYYY"
            format="dd/MM/yyyy"
            :value-format="datePickerFormat"
            data-test="newAnniversary"
          />
          <el-tooltip
            placement="right"
          >
            <div slot="content">
              <span>
                <b>Anchor date</b><br>
                A customer's first bill will be prorated from the
                start date of their subscription to the anchor date.
              </span>
            </div>
            <i class="el-icon-warning" />
          </el-tooltip>
        </el-form-item>
      </div>
    </el-form>
    <div class="modal-note">
      <i class="el-icon-info" />
      <div class="modal-note__text">
        Changing the Subscription Anniversary Date may cause changes to payment dates and the subscription balance.
      </div>
    </div>
    <div class="modal__footer">
      <el-button
        type="primary"
        :class="$style.save"
        data-test="submit"
        :loading="processing"
        @click="onSubmit"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.wrapper {
  width: 32rem;
}

.save {
  width: 15rem !important;
}
</style>
