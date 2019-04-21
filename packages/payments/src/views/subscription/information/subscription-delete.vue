<script>
export default {
  name: 'SubscriptionSetEndDateModal',
  props: {
    subscription: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    submit() {
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Subscription successfully deleted',
      })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <state-dialog
      title="Delete Subscription"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <el-icon
        slot="icon"
        name="news"
      />
      <el-button
        slot="subicon"
        icon="el-icon-delete"
        type="danger"
        circle
      />
      <p>
        Deleting a Subscription will set the Subscription
        End Date to tomorrow.
      </p>
      <p>
        The Subscription will then end and any outstanding
        Subscription Balance will be calculated and refundable/payable.
      </p>
      <el-button
        type="danger"
        :class="[
          $style.submit,
          'wide-button',
        ]"
        @click="submit"
      >
        Delete
      </el-button>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>

.root {
  margin-left: .5rem;
}

.submit {
  margin-top: 1rem;
}
</style>
