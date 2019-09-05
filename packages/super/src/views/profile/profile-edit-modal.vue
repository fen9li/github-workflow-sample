<script>
export default {
  name: 'ProfileEditModal',
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        givenName: null,
        familyName: null,
        email: null,
        telephone: null,
      },
      rules: {
        givenName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        familyName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        telephone: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
      progress: false,
    }
  },
  watch: {
    profile() {
      this.prefillFields()
    },
  },
  created() {
    this.prefillFields()
  },
  methods: {
    prefillFields() {
      const { form, profile } = this

      if (profile) {
        form.givenName = profile.givenName
        form.familyName = profile.familyName
        form.email = profile.email
        form.telephone = profile.telephone
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        this.progress = true

        setTimeout(() => {
          this.progress = false
          this.$emit('success')
        }, 1000)
      })
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      title="Edit Profile"
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
            label="First Name"
            prop="givenName"
            required
          >
            <el-input v-model="form.givenName" />
          </el-form-item>
          <el-form-item
            label="Last Name"
            prop="familyName"
            required
          >
            <el-input v-model="form.familyName" />
          </el-form-item>
          <el-form-item
            label="Email"
            prop="email"
            required
          >
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item
            label="Telephone"
            prop="telephone"
            required
          >
            <el-input v-model="form.telephone" />
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
