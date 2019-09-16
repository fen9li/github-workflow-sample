<script>
import { mapActions, mapMutations } from 'vuex'
import DataProcessor from '@lib/processors/data-processor'

export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
    processor: {
      type: DataProcessor,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: '',
      },
      progress: false,
    }
  },
  created() {
    if (this.item) {
      this.form = {
        name: this.item.name,
      }
    }
  },
  methods: {
    ...mapActions('categories', [
      'createCategory',
      'updateCategory',
    ]),
    ...mapMutations('categories', {
      setCategories: 'SET_CATEGORIES',
    }),
    onSubmit() {
      const { item, form } = this
      let request
      this.progress = true

      if (this.item) {
        request = this.updateCategory({
          ...form,
          id: item.id,
        })
      } else {
        request = this.createCategory(form)
      }

      request.then(() => {
        this.processor.getData()
          .then(data => this.setCategories(data))
      })

      this.$emit('close-modal')
      this.progress = false
    },
  },
}
</script>

<template>
  <el-dialog
    :title="item ? 'Edit Category' : 'Add Category'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form label-position="top">
      <el-form-item
        label="Name"
        required
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-button
        type="primary"
        :class="$style.button"
        :loading="progress"
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
</style>
