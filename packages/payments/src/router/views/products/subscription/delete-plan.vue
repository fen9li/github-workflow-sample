<script>
import StateDialog from '@components/state-dialog/state-dialog'

export default {
  name: 'SubscriptionDeleteModal',
  components: {
    StateDialog,
  },
  inheritAttrs: false,
  props: {
    plan: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    submit() {
      this.$message.success({
        dangerouslyUseHTMLString: true,
        // eslint-disable-next-line max-len
        message: '<strong>Success</strong><p>Pricing Plan successfully deleted.</p>',
        showClose: true,
      })
    },
  },
}
</script>

<template>
  <state-dialog
    title="Delete Pricing Plan"
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
      Are you sure you wish to delete this Pricing Plan?
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
</template>

<style lang="scss" module>

.icon {
  color: #F56C6C;
  cursor: pointer;
}

.submit {
  margin-top: 1rem;
}
</style>
