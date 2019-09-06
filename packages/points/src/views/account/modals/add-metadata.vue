<script>
import camelCase from 'lodash/camelCase'
import { mapActions } from 'vuex'

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
    ...mapActions('account', [
      'updateAccount',
    ]),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)
      if (!formValid) {
        return
      }
      this.progress = true
      await this.updateAccount({
        id: this.id,
        form: {
          metadata: {
            [camelCase(this.form.key)]: this.form.value
          }
        }
      })
      this.progress = false
      this.$emit('close-modal')
      this.$notify({
        type: 'success',
        title: 'Metadata updated',
        message: `Metadata for ${this.id} successfully updated`,
      })
    },
  },
}
</script>

<template>
  <el-dialog
    :title="title"
    v-bind="$attrs"
    modal-append-to-body
    append-to-body
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
