<script>
import ProductsSingleForm from '../products/forms/products-single-form.vue'
import set from 'lodash/set'

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
        start_on: '',
        end_on: '',
        price: {
          total: '',
          currency: 'aud',
        },
        active: null,
        id: null,
      },
    }
  },
  watch: {
    currentProduct(newVal) {
      this.formData = { ...newVal }
    },
  },
  created() {
    this.formData = { ...this.currentProduct }
  },
  methods: {
    updateDetailsValue({ fieldName, newVal }) {
      set(this.formData, fieldName, newVal)
    },
    async onSubmit() {
      const { formData } = this
      if (!this.validateAll().some(item => item === false)) {
        const requestData = {
          name: formData.name,
          price: formData.price.total,
          start_on: formData.start_on,
          end_on: formData.end_on,
          // Temporary transform to Boolean value for current API requirements
          active: formData.active === 'active',
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
          const firstError = error.violations[Object.keys(error.violations)[0]][0]
          this.$notify({
            type: 'error',
            title: 'Error',
            message: firstError,
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
  },
}
</script>

<template>
  <el-dialog
    title="Edit Single Product"
    :custom-class="$style.wrapper"
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
.wrapper {
  width: 36rem;
  max-width: 36rem !important;
}

.form {
  margin-bottom: -1rem;
}
</style>
