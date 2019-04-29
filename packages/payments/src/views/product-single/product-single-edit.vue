<script>
import ProductsSingleForm from '../products/forms/products-single-form.vue'

export default {
  name: 'ProductSingleEdit',
  components: {
    ProductsSingleForm,
  },
  inheritAttrs: false,
  props: {
    currentProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        start_on: '',
        end_on: '',
        price: '',
        currency: 'aud',
        image: '',
        active: null,
        id: null,
      },
    }
  },
  watch: {
    currentProduct(newVal) {
      this.adjustFormData(newVal)
    },
  },
  created() {
    this.adjustFormData(this.currentProduct)
  },
  methods: {
    updateDetailsValue({ fieldName, newVal }) {
      this.formData[fieldName] = newVal
    },
    async onSubmit() {
      const { formData } = this
      if (!this.validateAll().some(item => item === false)) {
        const requestData = {
          name: formData.name,
          price: formData.price,
          start_on: formData.start_on,
          end_on: formData.end_on,
        }

        const [error, response] = await this.$api.put(`/single-products/${formData.id}`, requestData)

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Changes saved successfully.',
          })
          this.$emit('update:visible', false)
          this.$emit('updated')
        } else if (error) {
          this.$notify({
            type: 'error',
            title: 'Error',
            message: error.message,
          })
        }
      }
    },
    validateAll() {
      const result = []
      this.$refs.form.$children[0].validate( valid => {
        result.push(valid)
      })
      return result
    },
    adjustFormData(newVal) {
      this.formData = {
        ...newVal,
        price: parseFloat(newVal.price, 10).toFixed(2),
        currency: newVal.currency || 'aud',
      }
    },
  },
}
</script>

<template>
  <el-dialog
    title="Edit Single Product"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <products-single-form
      ref="form"
      :data="formData"
      :edit="true"
      :class="$style.form"
      @changeValue="updateDetailsValue"
    />
    <div
      class="modal__footer"
    >
      <el-button
        type="primary"
        class="wide-button"
        @click="onSubmit"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>


.form {
  margin-bottom: -1rem;
}
</style>
