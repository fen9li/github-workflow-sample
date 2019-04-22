<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'CustomerVPOSModal',
  directives: {
    mask,
  },
  data() {
    return {
      form: {
        companyName: null,
        abn: null,
        firstName: null,
        lastName: null,
        email: '',
        phone: null,
        address: null,
      },
      rules: {
        firstName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        lastName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Email is required',
            trigger: 'blur' },
          {
            type: 'email',
            message: 'Must be valid email address',
            trigger: ['blur', 'change'],
          },
        ],
        phone: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    getPaymentSysLogo() {
      // eslint-disable-next-line max-len
      return require(`~/assets/images/${this.cardDetails.paymentsSystem}_logo.png`)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Customer added created.',
          })
          this.$emit('update:visible', false)
        } else {
          return false
        }
      })
    },
  },
}
</script>

<template>
  <div>
    <el-dialog
      title="Add Customer"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="180px"
          label-position="left"
        >
          <el-form-item label="Company name">
            <el-input v-model="form.companyName" />
          </el-form-item>

          <el-form-item label="ABN">
            <el-input
              v-model="form.abn"
              v-mask="['#### #### #### ####']"
            />
          </el-form-item>

          <el-form-item
            label="First Name"
            prop="firstName"
          >
            <el-input
              v-model="form.firstName"
              placeholder="Name"
            />
          </el-form-item>

          <el-form-item
            label="Last Name"
            prop="lastName"
          >
            <el-input
              v-model="form.lastName"
              placeholder="Name"
            />
          </el-form-item>

          <el-form-item
            label="Email"
            prop="email"
          >
            <el-input
              v-model="form.email"
              placeholder="name@email.com"
            />
          </el-form-item>

          <el-form-item
            label="Telephone"
            prop="phone"
          >
            <el-input
              v-model="form.phone"
              v-mask="['#### #### ####']"
            />
          </el-form-item>

          <el-form-item
            label="Address"
          >
            <el-input
              v-model="form.address"
            />
          </el-form-item>
        </el-form>

        <div
          slot="footer"
          class="modal__footer"
        >
          <el-button
            type="primary"
            @click="onSubmit"
          >
            Save
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
