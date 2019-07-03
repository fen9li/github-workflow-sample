<script>
export default {
  name: 'CouponDeleteModal',
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onSubmit() {
      const [error] = await this.$api.delete(`/coupons/${this.id}`)

      if (error) {
        const firstError = error.violations[Object.keys(error.violations)[0]][0]
        this.$notify({
          type: 'error',
          title: 'Error',
          message: firstError,
        })
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'Coupon successfully deleted.',
        })
        this.$emit('update:visible', false)
        this.$router.push({ name: 'coupons' })
      }
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
