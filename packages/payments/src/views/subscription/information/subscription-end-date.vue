<script>
export default {
  name: 'SubscriptionSetEndDateModal',
  props: {
    subscription: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        endDate: '',
      },
    }
  },
  methods: {
    submit() {
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Changes successfully saved',
      })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <state-dialog
      title="Edit Subscription"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-icon
        slot="icon"
        name="date"
      />
      <p>
        When the Subscription reaches it's End Date,
        any outstanding Subscription Balance
        will be calculates and refundable/payable.
      </p>
      <el-date-picker
        v-model="form.endDate"
        :class="$style.date"
        type="date"
        placeholder="DD/MM/YY"
        format="dd/MM/yy"
        value-format="dd/MM/yy"
      />
      <el-button
        type="primary"
        class="wide-button"
        :disabled="!form.endDate"
        @click="submit"
      >
        Set Date
      </el-button>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>

.root {
  margin-left: .5rem;
}

.date {
  margin: 1rem 0 2rem;
}

</style>
