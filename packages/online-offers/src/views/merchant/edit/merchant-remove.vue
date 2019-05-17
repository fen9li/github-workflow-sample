
<script>
export default {
  name: 'MerchandRemoveModal',
  inheritAttrs: false,
  props: {
    merchant: {
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
  <el-dialog
    v-bind="$attrs"
    title="Remove Merchant"
    :class="$style.wrapper"
    v-on="$listeners"
  >
    <div :class="$style.root">
      <p :class="$style.text">
        {{ `Are you sure you wish to remove ${merchant.name}?` }}
        <br>
        The merchant will be removed for all providers across all platforms.
      </p>
      <el-button
        type="danger"
        :class="[
          $style.submit,
          'wide-button',
        ]"
        @click="submit"
      >
        Remove merchant
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.wrapper {
  :global {
    .el-dialog {
      max-width: unset !important;
    }
  }
}

.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
}

.submit {
  margin-top: 2rem;
}
</style>
