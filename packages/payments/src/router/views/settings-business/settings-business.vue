<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'

export default {
  name: 'SettingsBusiness',
  page: {
    title: 'Business Details',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
  },
  data() {
    return {
      form: {
        companyName: null,
        companyACN: null,
        typeOfBusiness: '',
        contactPerson: null,
        email: null,
        phone: null,
        address: null,
        timeZone: null,
      },
      rules: {
        companyName: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        companyACN: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        typeOfBusiness: [
          {
            required: true,
          },
        ],
        contactPerson: [
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
        address: [
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
            trigger: 'blur',
          },
        ],
      },

    }
  },
}
</script>

<template>
  <main-layout title="Business Details">
    <el-card class="settings-business">
      <el-form
        :model="form"
        :rules="rules"
        class="card-form"
      >
        <el-form-item
          label="Company name"
          prop="companyName"
        >
          <el-input
            v-model="form.companyName"
            placeholder="Professionals Australia"
          />
        </el-form-item>

        <el-form-item
          label="Company ACN/ABN"
          prop="companyACN"
        >
          <el-input
            v-model="form.companyACN"
            placeholder="123456789012"
          />
        </el-form-item>


        <el-form-item
          label="Type of business"
          prop="typeOfBusiness"
        >
          <el-select
            v-model="form.typeOfBusiness"
            placeholder="Company"
          >
            <el-option
              label="Company"
              value="company"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Contact Person"
          prop="contactPerson"
        >
          <el-input
            v-model="form.contactPerson"
            placeholder="Name"
          />
        </el-form-item>

        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input
            v-model="form.email"
            placeholder="info@professionals.com"
          />
        </el-form-item>

        <el-form-item
          label="Telephone"
          prop="phone"
        >
          <el-input
            v-model="form.phone"
            placeholder="1300 838 837"
          />
        </el-form-item>

        <el-form-item
          label="Address"
          prop="address"
        >
          <el-input
            v-model="form.phone"
            placeholder="11 Toorak Road, Camberwell, VIC 3209"
          />
        </el-form-item>

        <el-form-item
          label="Timezone"
          prop="timezone"
        >
          <el-input
            v-model="form.timezone"
            placeholder="AUDT/AEST - Melbourne"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </main-layout>
</template>
