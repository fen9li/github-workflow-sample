<script>
import ProductsSubscriptionForm from
  '../products/forms/products-subscription-form.vue'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'ProductSubscriptionEdit',
  components: {
    ProductsSubscriptionForm,
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
      processing: false,
      form: {},
    }
  },
  watch: {
    currentProduct(newVal){
      this.form = cloneDeep(newVal)
    }
  },
  mounted() {
    this.form = cloneDeep(this.currentProduct)
  },
  methods: {
    updateDetailsValue({ fieldName, newVal }) {
      this.form[fieldName] = newVal
    },
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        const { form } = this

        this.processing= true

        const [error, response] = await this.$api.put(`/products/${this.currentProduct.id}`,
          {
            name: form.name,
            sunset_at: form.sunset_at
          })

        this.processing = false

        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Changes saved successfully.',
          })

          this.$emit('update:visible', false)
          this.$emit('updated')
        } else if (error) {
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
    title="Edit Subscription Product"
    v-bind="$attrs"
    :custom-class="$style.root"
    v-on="$listeners"
  >
    <products-subscription-form
      ref="form"
      :data="form"
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
        :loading="processing"
        data-test="submit"
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
