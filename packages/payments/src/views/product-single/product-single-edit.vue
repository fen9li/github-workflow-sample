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
      processing: false,
      form: {
        name: null,
        start_at: null,
        end_at: null,
        price: {
          total: null,
          currency: 'aud',
        },
        id: null,
      },
    }
  },
  watch: {
    currentProduct(newVal) {
      this.form = { ...newVal }
    },
  },
  created() {
    this.form = { ...this.currentProduct }
  },
  methods: {
    updateDetailsValue({ fieldName, newVal }) {
      set(this.form, fieldName, newVal)
    },
    async onSubmit() {
      const { form } = this
      if (!this.validateAll().some(item => item === false)) {
        this.processing = true

        const requestData = {
          name: form.name,
          price: form.price.total,
          start_at: form.start_at,
          end_at: form.end_at,
        }

        const [error, response] = await this.$api.put(`/single-products/${form.id}`, requestData)

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
    title="Edit Single Product"
    :custom-class="$style.wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <products-single-form
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
.wrapper {
  width: 36rem;
  max-width: 36rem !important;
}

.form {
  margin-bottom: -1rem;
}
</style>
