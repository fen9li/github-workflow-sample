<script>
import paymentForm from './payment-form'

export default {
  name: 'CustomerPaymentAddModal',
  components: {
    paymentForm,
  },
  inheritAttrs: false,
  props: {
    subscription: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        account: {
          name: '',
          bsb: '',
          number: '',
        },
        card: {
          name: '',
          number: '',
          expiry: '',
          cvv: '',
        },
      },
    }
  },
  methods: {
    onSave() {
      this.$emit('update:visible', false)
    },
    updateValue({ fieldName, type, newVal }) {
      this.form[type][fieldName] = newVal
    },
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
      :form="form"
      @changeValue="updateValue"
      @save="onSave"
    />
  </el-dialog>
</template>
