<script>
export default {
  name: 'UserAccessEdit',
  inheritAttrs: false,
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        email: '',
        role: '',
        status: '',
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
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.resetForm()
      }
    },
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
    resetForm() {
      const { row } = this

      this.form = {
        name: row.name,
        email: row.email,
        role: row.role,
        status: row.status,
      }
    },
  },
}
</script>

<template>
  <div>
    <el-button
      type="text"
      size="small"
      icon="el-icon-edit"
      :class="$style.trigger"
      plain
      circle
      @click="dialogVisible = true"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      title="Edit User"
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
        <el-form-item
          label="Active"
          prop="status"
        >
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="Active"
            inactive-value="Inactive"
          />
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

  .trigger {
    font-size: 20px;
    color: $primary-light;
  }

  .noteIco {
    font-size: 16px;
    color: $primary-light;
  }

  .radioList {
    width: 100%;
  }
</style>
