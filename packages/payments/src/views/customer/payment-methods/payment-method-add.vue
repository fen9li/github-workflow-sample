<script>
import paymentForm from './payment-form'

export default {
  name: 'CustomerPaymentAddModal',
  components: {
    paymentForm,
  },
  inheritAttrs: false,
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    onSave() {
      this.$emit('update:visible', false)
      this.$emit('updated')
    }
  },
}
</script>

<template>
  <el-dialog
    v-bind="$attrs"
    title="Add Payment Method"
    v-on="$listeners"
  >
    <payment-form
      :customer="customer"
      @added="onSave"
    />
  </el-dialog>
</template>
