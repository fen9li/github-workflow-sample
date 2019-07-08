<script>

export default {
  name: 'DisableEndpoint',
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
    title="Deactivate Webhook"
    :class="$style.wrapper"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="link"
    />
    <el-button
      slot="subicon"
      icon="el-icon-close"
      circle
      :class="$style.subIcon"
    />
    <p>
      This webhook endpoint may be temporarily <br>
      disabled so that it will not receive <br>
      notifications until it is enabled again.
    </p>
    <p>
      Eonx will not retry any notifications that are <br>
      generated while the endpoint is disabled.
    </p>
    <el-button
      type="primary"
      :class="[
        $style.submit,
        'wide-button',
      ]"
      @click="submit"
    >
      Disactivate Webhook
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
