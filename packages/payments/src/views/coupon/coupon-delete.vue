<script>
export default {
  name: 'CouponDeleteModal',
  inheritAttrs: false,
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onSubmit() {
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
      name="discount"
    />
    <el-button
      slot="subicon"
      icon="el-icon-delete"
      type="danger"
      circle
    />
    <p>
      Are you sure you wish to delete
      <br>
      this coupon?
    </p>
    <el-button
      type="primary"
      :class="[
        $style.submit,
        'wide-button',
      ]"
      @click="onSubmit"
    >
      Delete Coupon
    </el-button>
  </state-dialog>
</template>

<style lang="scss" module>
.submit {
  margin-top: 1rem;
}
</style>
