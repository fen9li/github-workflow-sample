<script>

export default {
  name: 'RetryWebhooks',
  inheritAttrs: false,
  props: {
    endpoint: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    submit() {
      // TODO: Add API endpoint
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Changes successfully saved.',
      })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <state-dialog
    v-bind="$attrs"
    title="Retry Failed Webhooks"
    :class="$style.wrapper"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="link"
    />
    <p>
      This will retry all webhook attempts that have <br>
      failed in the last 30 calendar days.
    </p>
    <p>
      Please be patient, as the system might take a <br>
      while to process all the attempts.
    </p>
    <el-button
      type="primary"
      :class="[
        $style.submit,
        'wide-button',
      ]"
      @click="submit"
    >
      Retry failed webhooks
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

.subIcon {
  color: #fff;
  background-color: #bbb;
}
</style>
