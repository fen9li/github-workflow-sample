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
  data() {
    return {
      processing: false,
    }
  },
  methods: {
    async onSubmit() {
      this.processing = true

      const [error] = await this.$api.delete(`/coupons/${this.id}`)

      this.processing = false

      if (error) {
        const violations = Object.keys(error.violations)
        violations.forEach(violation => {
          setTimeout(() => {
            this.$notify({
              type: 'error',
              title: 'Error',
              message: `${violation}: ${error.violations[violation][0]}`,
            })
          }, 50)
        })
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'Coupon successfully deleted.',
        })
        this.$emit('update:visible', false)
        this.$router.push({ name: 'coupons' , params: { removed: this.id } })
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
      :loading="processing"
      data-test="submit"
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
