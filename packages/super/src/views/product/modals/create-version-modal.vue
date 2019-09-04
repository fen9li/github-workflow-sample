<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateProductModal',
  props: {
    product: {
      type: Object,
      required: true,
    },
    version: {
      type: Object,
      default: () => ({}),
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
        name: '',
        description: '',
        latest: true,
      },
    }
  },
  created() {
    const { isEdit, version, form } = this

    // Prefill values if we are in edit mode
    if (isEdit) {
      const { name, description, latest, status } = version

      form.name = name
      form.description = description
      form.latest = latest
      this.$set(form, 'status', status)
    }
  },
  methods: {
    ...mapActions('version', ['createVersion', 'updateVersion']),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)

      if (!formValid) {
        return
      }

      this.progress = true

      if (this.isEdit) {
        await this.updateVersion({
          form: this.form,
          productId: this.product.id,
          versionId: this.version.id,
        })
      } else {
        await this.createVersion({
          form: this.form,
          productId: this.product.id,
        })
      }

      this.$emit('close-modal')
      this.$emit('refresh-table')
      this.progress = false
    },
    onLatestChanged() {
      const { form } = this
      const newLatestVal = !form.latest

      if (!this.isEdit) {
        form.latest = newLatestVal
      } else {
        if (newLatestVal !== true || form.status !== 'inactive') {
          form.latest = newLatestVal
        }

        if (newLatestVal) {
          this.form.status = 'inactive'
        }
      }
    },
  },
}
</script>

<template>
  <el-dialog
    :title="`${isEdit ? 'Edit' : 'Create'} Version`"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div :class="$style.productRow">
      Product
      <span :class="$style.productName"> {{ product.name }}</span>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <el-form-item
        label="Version Name"
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
        label="Version Description"
        prop="description"
      >
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="4"
          :disabled="progress"
          maxlength="1024"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-checkbox
          :value="form.latest"
          @input="onLatestChanged"
        >
          Mark as latest version
        </el-checkbox>
      </el-form-item>
      <el-form-item v-if="isEdit">
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

.productRow {
  margin-bottom: 1.2rem;
}

.productName {
  margin-left: 2rem;
  font-weight: bold;
  color: gray;
}
</style>
