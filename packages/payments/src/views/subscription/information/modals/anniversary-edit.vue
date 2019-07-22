<script>
import { datePickerFormat } from '@lib/utils/date-helper'

export default {
  name: 'EditSubscriptionAnniversaryModal',
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
            message: 'New date is required',
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
        const [error, response] = await this.$api.put(`/subscriptions/${this.subscription.id}/anniversary`, {
          new_anniversary_date: newDate,
        })

        this.processing = false

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `Changes saved successfully`,
          })
          this.$emit('update:visible', false)
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
            :value="subscription.next_billed_at"
            type="date"
            placeholder="Enter Date"
            :editable="false"
            disabled
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
            type="date"
            placeholder="Enter Date"
            :editable="false"
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
        Changing the Subscription Anchor Date may cause changes to payment dates and the subscription balance.
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
