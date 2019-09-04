<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateProductModal',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      progress: false,
      form: {
        name: '',
        url: '',
        description: '',
        status: ''
      },
    }
  },
  created() {
    const { form } = this
    const { name, url, description, status } = this.product

    form.name = name
    form.url = url
    form.description = description
    form.status = status
  },
  methods: {
    ...mapActions('product', ['updateProduct']),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)

      if (!formValid) {
        return
      }

      this.progress = true

      await this.updateProduct({
        form: this.form,
        productId: this.product.id,
      })

      this.$emit('close-modal')
      this.$emit('refresh-table')
      this.progress = false
    },
  },
}
</script>

<template>
  <el-dialog
    title="Edit Product"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <el-form-item
        label="Product Name"
        required
        prop="name"
      >
        <el-input
          v-model="form.name"
          :disabled="progress"
          maxlength="255"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="URL"
        required
        prop="url"
      >
        <el-input
          v-model="form.url"
          :disabled="progress"
          maxlength="1024"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="Product Description"
        prop="description"
      >
        <el-input
          v-model="form.description"
          :disabled="progress"
          maxlength="1024"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.status">
          <el-option
            label="Active"
            value="active"
          />
          <el-option
            label="Inactive"
            value="inactive"
          />
        </el-select>
      </el-form-item>

      <el-button
        type="primary"
        :class="$style.button"
        :loading="progress"
        :disabled="progress"
        class="el-button--wide"
        @click.stop="onSubmit"
      >
        Save
      </el-button>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" module>
.button {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

:global {
  .el-input__count-inner {
    line-height: 1;
  }
}
</style>
