<script>
export default {
  name: 'AddMetadata',
  props: {
    id: {
      type: String,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      progress: false,
      form: {
        key: '',
        value: '',
      },
      rules: {
        key: {
          required: true,
          message: 'Key field is required',
        },
        value: {
          required: true,
          message: 'Value field is required',
        },
      }
    }
  },
  computed: {
    title() {
      return `${this.isEdit ? 'Edit' : 'Add'} Account Metadata`
    }
  },
  methods: {
    async onSubmit() {
      this.progress = true
      this.$emit('close-modal')
      this.progress = false
    },
  },
}
</script>

<template>
  <el-dialog
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <el-form-item
        label="Key"
        prop="key"
        required
      >
        <el-input
          v-model="form.key"
          :disabled="isEdit"
        />
      </el-form-item>
      <el-form-item
        label="Value"
        prop="value"
        required
      >
        <el-input v-model="form.value" />
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
