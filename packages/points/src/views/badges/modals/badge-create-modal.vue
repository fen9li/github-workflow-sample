<script>
import { mapActions } from 'vuex'

export default {
  name: 'BadgeCreateModal',
  data() {
    return {
      form: {
        provider: '',
        name: '',
        description: '',
        logo: '',
        slug: '',
      },
      rules: {
        provider: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        logo: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'change',
          },
        ],
      },
      progress: false,
    }
  },
  methods: {
    ...mapActions('badge', [
      'createBadge',
    ]),
    onSuccessUploading(img) {
      this.form.logo = img.cdnUrl
      this.$refs.form.validateField('logo')
    },
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)

      if (!formValid) {
        return false
      }

      this.progress = true
      const response = await this.createBadge(this.form)
      this.progress = false

      if (response) {
        this.$emit('success')
      }
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      title="Create Badge"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="180px"
          label-position="top"
        >
          <el-form-item
            label="Provider Name"
            prop="provider"
            required
          >
            <el-input v-model="form.provider" />
          </el-form-item>
          <el-form-item
            label="Badge Name"
            prop="name"
            required
          >
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            label="Badge Description"
            prop="description"
          >
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item
            label="Logo URL"
            prop="logo"
          >
            <image-uploader
              :image="form.logo"
              theme="input"
              crop="400x400"
              @onUpload="onSuccessUploading"
            />
          </el-form-item>
          <el-form-item
            label="Badge Slug"
            prop="slug"
          >
            <el-input v-model="form.slug" />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="modal__footer"
        >
          <el-button
            type="primary"
            class="el-button--wide"
            :loading="progress"
            @click="onSubmit"
          >
            Save
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  :global {
    .el-dialog {
      max-width: 35rem !important;
    }

    .el-form-item {
      .el-checkbox-group {
        width: 100%;
      }
    }
  }
}
</style>
