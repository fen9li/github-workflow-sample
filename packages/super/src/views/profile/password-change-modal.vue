<script>
export default {
  name: 'PasswordChangeModal',
  data() {
    return {
      form: {
        password: null,
        newPassword: null,
        confirmPassword: null,
      },
      rules: {
        password: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        newPassword: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        confirmPassword: [
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
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        const { newPassword, confirmPassword } = this.form

        if (!valid || newPassword !== confirmPassword) {
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
      title="Change Password"
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
            label="Password"
            prop="password"
            required
          >
            <el-input
              v-model="form.password"
              show-password
            />
          </el-form-item>
          <el-form-item
            label="New Password"
            prop="newPassword"
            required
          >
            <el-input
              v-model="form.newPassword"
              show-password
            />
          </el-form-item>
          <el-form-item
            label="Confirm New Password"
            prop="confirmPassword"
            required
          >
            <el-input
              v-model="form.confirmPassword"
              show-password
            />
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
