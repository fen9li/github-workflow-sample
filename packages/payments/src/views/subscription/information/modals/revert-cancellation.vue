<script>
export default {
  name: 'RevertSubscriptionCancellation',
  inheritAttrs: false,
  props: {
    subscription: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      const [error] = await this.$api.delete(`/subscriptions/${this.subscription.id}/cancellation`)
      this.loading = false
      if (error) {
        const firstError = error.violations[Object.keys(error.violations)[0]][0]
        this.$notify({
          type: 'error',
          title: 'Error',
          message: firstError,
        })
      } else
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Changes saved successfully`,
        })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <state-dialog
    v-bind="$attrs"
    title="Revert Subscription Cancellation"
    :class="$style.wrapper"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="refresh-right"
    />
    <p>
      Are you sure you wish to revert cancellation?
    </p>
    <el-button
      type="danger"
      :class="[
        $style.submit,
        'wide-button',
      ]"
      :loading="loading"
      @click="onSubmit"
    >
      Revert Cancellation
    </el-button>
  </state-dialog>
</template>

<style lang="scss" module>
.wrapper {
  :global {
    .el-dialog {
      width: 26rem;
    }
  }
}

.submit {
  margin-top: 1rem;
}
</style>
