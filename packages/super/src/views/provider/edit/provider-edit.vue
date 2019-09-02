<script>
export default {
  name: 'ProviderEdit',
  props: {
    provider: {
      type: Object,
      default: () => {},
    },
    create: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        createdAt: null,
        updatedAt: null,
        id: null,
        name: null,
        description: null,
        '2fa': null,
        timezone: null,
        products: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        timezone: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'change',
          },
        ],
        status: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'change',
          },
        ],
        products: [
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
  watch: {
    provider() {
      this.prefillFields()
    },
  },
  created() {
    if (!this.create) {
      this.prefillFields()
    }
  },
  methods: {
    prefillFields() {
      if (this.provider) {
        this.form = this.provider
      }
    },
  }
}
</script>

<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="180px"
    label-position="top"
  >
    <el-form-item
      label="Provider Name"
      prop="name"
    >
      <el-input
        v-model="form.name"
        placeholder="Name"
      />
    </el-form-item>
    <el-form-item
      label="Provider Description"
      prop="description"
      type="textarea"
    >
      <el-input
        v-model="form.description"
        placeholder="Description"
      />
    </el-form-item>
    <el-form-item
      label="Provider Timezone"
      prop="timezone"
    >
      <el-select
        v-model="form.timezone"
        placeholder="please select timezone"
        disabled
      >
        <el-option
          :label="form.timezone"
          :value="form.timezone"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      prop="2fa"
    >
      <el-checkbox
        v-model="provider['2fa']"
        label="Enforce Two-Factor Authen6ca6on"
      />
    </el-form-item>
    <el-form-item
      label="Status"
      prop="status"
    >
      <el-select
        v-model="form.status"
        placeholder="Please select status"
      >
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
  </el-form>
</template>
