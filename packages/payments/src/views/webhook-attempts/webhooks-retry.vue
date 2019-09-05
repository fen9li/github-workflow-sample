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
  data() {
    return {
      processing: false,
    }
  },
  methods: {
    async onSubmit() {
      this.processing = true
      const [error] = await this.$api.post('/webhooks/failed/retry')
      this.processing = true

      if (error) {
        this.$notify({
          type: 'error',
          title: 'Error',
          message: error.message,
        })
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Successfuly requested`,
        })
        this.$emit('update:visible', false)
        this.$emit('update')
      }
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
      :loading="processing"
      @click="onSubmit"
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
