<script>
export default {
  name: 'UserAccessEdit',
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        email: '',
        role: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Name is required',
            trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: 'Email must be a valid',
            trigger: 'blur',
          },
        ],
        role: [
          {
            required: true,
            message: 'Role is required',
            trigger: 'blur',
          },
        ],
      },
      roles: ['Admin', 'Operator'],
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // some api request here

          this.dialogVisible = false
        } else {
          console.warn('submit error')

          return false
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <el-button
      type="primary"
      size="large"
      @click="dialogVisible = true"
    >
      Add User
    </el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      title="Add User"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="180px"
        label-position="left"
      >
        <el-form-item
          label="Name"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="Name"
          />
        </el-form-item>
        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input
            v-model="form.email"
            placeholder="Email"
          />
        </el-form-item>
        <el-form-item
          label="Role"
          prop="role"
        >
          <div :class="$style.radioList">
            <el-radio
              v-for="(role, index) in roles"
              :key="index"
              v-model="form.role"
              :label="role"
            >
              {{ role }}
            </el-radio>
          </div>
          <i :class="[$style.noteIco, 'el-icon-info']" />
        </el-form-item>
      </el-form>
      <div
        class="modal__footer"
      >
        <el-button
          class="wide-button"
          type="primary"
          @click="onSubmit"
        >
          Save
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
  @import '@design';

  .noteIco {
    font-size: 16px;
    color: $primary-light;
  }

  .radioList {
    width: 100%;
  }
</style>
