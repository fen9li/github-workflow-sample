<script>
import pick from 'lodash/pick'
import { mapActions } from 'vuex'

export default {
  name: 'BadgeEditModal',
  props: {
    badge: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        provider: null,
        name: null,
        description: null,
        logo: null,
        slug: null,
      },
      rules: {
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
  created() {
    this.form = pick(this.badge, [
      'provider',
      'name',
      'description',
      'logo',
      'slug',
    ])
  },
  methods: {
    ...mapActions('badge', [
      'updateBadge',
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
      const [, response] = await this.updateBadge({
        id: this.badge.id,
        form: this.form,
      })

      if (response) {
        this.$emit('success', response)
      }
      this.progress = false
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      title="Edit Badge"
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
          >
            <el-input
              v-model="form.provider"
              disabled
            />
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
