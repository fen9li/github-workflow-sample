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
  data() {
    return {
      form: {
        account: {
          name: '',
          bsb: '',
          number: '',
        },
        card: {
          name: '1',
          number: '1111 1111 1111',
          expiry: '11/20',
          cvv: '111',
        },
      },
    }
  },
  methods: {
    async onSave() {
      const requestData = {
        token: '6G2CTP82HK37AZYJHW78',
      }

      const [error, response] = await this.$api.post(`/customers/${this.customer.id}/tokens`, requestData)
      // this.$emit('update:visible', false)
      console.warn(error, response)
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
