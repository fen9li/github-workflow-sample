<script>
export default {
  name: 'DeleteWebhook',
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
        message: 'Webhook successfully deleted.',
      })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <state-dialog
    v-bind="$attrs"
    title="Delete Webhook"
    :class="$style.wrapper"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="link"
    />
    <el-button
      slot="subicon"
      type="danger"
      icon="el-icon-delete"
      circle
    />
    <div :class="$style.text">
      <p>
        After deleting this endpoint no future <br>
        webhook will be sent to this URL.
      </p>
    </div>
    <el-button
      type="primary"
      :class="[
        $style.submit,
        'wide-button',
      ]"
      @click="submit"
    >
      Delete Webhook
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
