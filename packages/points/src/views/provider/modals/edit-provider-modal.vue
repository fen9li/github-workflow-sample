<script>
import { mapActions } from 'vuex'

export default {
  name: 'EditProviderModal',
  props: {
    provider: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      progress: false,
      form: {
        updateSchedule: false,
        updateScheduleDate: '',
        earnRate: 0,
        burnRate: 0,
        label: '',
        logo: '',
      },
    }
  },
  created() {
    const { form } = this
    const {
      updateSchedule,
      updateScheduleDate,
      earnRate,
      burnRate,
      label,
      logo,
    } = this.provider

    form.updateSchedule = updateSchedule
    form.updateScheduleDate = updateScheduleDate
    form.earnRate = earnRate
    form.burnRate = burnRate
    form.label = label
    form.logo = logo
  },
  methods: {
    ...mapActions('provider', ['updateProvider']),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)

      if (!formValid) {
        return
      }

      this.progress = true

      await this.updateProvider({
        providerId: this.provider.id,
        form: this.form,
      })

      this.$emit('close-modal')
      this.progress = false
    },
  },
}
</script>

<template>
  <el-dialog
    title="Edit Provider"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      :disabled="progress"
    >
      <el-form-item>
        <el-checkbox v-model="form.updateSchedule">
          Schedule Earn/Burn Rate Update
        </el-checkbox>
      </el-form-item>

      <el-form-item
        label="Update Schedule"
        prop="updateScheduleDate"
        required
      >
        <el-date-picker
          v-model="form.updateScheduleDate"
          type="date"
          placeholder="Enter Date"
        />
      </el-form-item>

      <el-form-item>
        <el-col :span="12">
          <el-form-item
            label="Earn Rate"
            prop="earnRate"
            required
          >
            <el-input v-model="form.earnRate" />
          </el-form-item>
        </el-col>
        <el-col :span="2" />
        <el-col :span="12">
          <el-form-item
            label="Burn Rate"
            prop="burnRate"
            required
          >
            <el-input v-model="form.burnRate" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item
        label="Label"
        prop="label"
        required
      >
        <el-input v-model="form.label" />
      </el-form-item>

      <el-form-item
        required
        label="Logo"
        prop="logo"
      >
        <image-uploader
          :image="provider.logo"
          @onUpload="form.logo = $event.cdnUrl"
        />
      </el-form-item>

      <el-button
        type="primary"
        :class="$style.button"
        :loading="progress"
        class="el-button--wide"
        @click.stop="onSubmit"
      >
        Save
      </el-button>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" module>
.button {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

:global {
  .el-input__count-inner {
    line-height: 1;
  }
}
</style>
