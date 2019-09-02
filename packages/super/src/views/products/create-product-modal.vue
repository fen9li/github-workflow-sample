<script>
import { mapActions } from 'vuex'
import DataProcessor from '@lib/processors/data-processor'

export default {
  name: 'CreateProductModal',
  props: {
    processor: {
      type: DataProcessor,
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
      },
    }
  },
  methods: {
    ...mapActions('product', ['createProduct']),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)

      if (!formValid) {
        return
      }

      this.progress = true

      await this.createProduct(this.form)
      await this.processor.getData()

      this.$emit('close-modal')
      this.progress = false
    },
  },
}
</script>

<template>
  <el-dialog
    title="Create Product"
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
