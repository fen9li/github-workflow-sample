<script>
import ProductsSingleForm from '../products/forms/products-single-form.vue'
import cloneDeep from 'lodash/cloneDeep'

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
        productName: '',
        productCode: '',
        effectiveStartDate: '',
        endDate: '',
        amount: '',
        currency: 'aud',
        image: '',
        active: null,
      },
    }
  },
  mounted() {
    this.formData = cloneDeep(this.currentProduct)
  },
  methods: {
    updateDetailsValue({ fieldName, newVal }) {
      this.formData[fieldName] = newVal
    },
    onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'Changes saved successfully.',
        })

        this.$emit('update:visible', false)
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
