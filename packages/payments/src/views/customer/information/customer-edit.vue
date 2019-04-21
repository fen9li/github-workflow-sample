<script>
export default {
  name: 'CustomerEditModal',
  inheritAttrs: false,
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        companyName: '',
        abn: '',
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        address: '',
      },
      rules: {},
    }
  },
  methods: {
    onSave() {

    },
  },
}
</script>

<template>
  <el-dialog
    v-bind="$attrs"
    title="Edit Customer"
    v-on="$listeners"
  >
    <el-form
      :model="form"
      :rules="rules"
      class="card-form"
    >
      <el-form-item
        label="Company Name"
      >
        <el-input v-model="form.companyName" />
      </el-form-item>

      <el-form-item
        label="ABN"
      >
        <el-input v-model="form.abn" />
      </el-form-item>

      <el-form-item
        label="First Name"
        required
      >
        <el-input v-model="form.firstName" />
      </el-form-item>

      <el-form-item
        label="Last Name"
        required
      >
        <el-input v-model="form.lastName" />
      </el-form-item>

      <el-form-item
        label="Email"
        required
      >
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item
        label="Telephone"
        required
      >
        <el-input v-model="form.telephone" />
      </el-form-item>

      <el-form-item
        label="Address"
        required
      >
        <el-input v-model="form.address" />
      </el-form-item>
    </el-form>

    <el-button
      type="primary"
      :class="$style.saveButton"
      @click="onSave"
    >
      Save
    </el-button>
  </el-dialog>
</template>

<style lang="scss" module>

.root {
  margin-left: 1rem;
}

.customer {
  font-size: 1rem;
}

.saveButton {
  display: block;
  width: 15rem;
  margin: 2rem auto 0;
}
</style>
