<script>

export default {
  name: 'CustomerEditModal',
  inheritAttrs: false,
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    submit() {
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Coupon successfully deleted.',
      })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <state-dialog
    v-bind="$attrs"
    title="Delete Coupon"
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
      Are you sure you wish to delete this coupon?
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

.root {
  margin-left: .5rem;
}

.submit {
  margin-top: 1rem;
}
</style>
