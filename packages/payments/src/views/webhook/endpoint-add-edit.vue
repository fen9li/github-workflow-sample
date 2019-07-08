<script>
export default {
  name: 'AddEditWebhooksEndpoint',
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    endpoint: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        url: this.edit ? this.endpoint.url : '',
        version: 'current',
        events: [],
      },
      allEvents: [
        { value: 'failed', label: 'payment.failed' },
        { value: 'success', label: 'payment.success' },
        { value: 'added', label: 'subscription.added' },
        { value: 'created', label: 'subscription.created' },
        { value: 'cancelled', label: 'subscription.cancelled' },
      ],
      allVersions: [
        { value: 'current', label: 'Your current version (2018-11-08)' },
      ],
      rules: {
        url: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        version: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        events: [
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
    async onSubmit() {
      if (!this.validateAll().some(item => item === false)) {
        // const [error, response] = await this.$api.put()

        // if (response) {
        //   this.$notify({
        //     type: 'success',
        //     title: 'Success',
        //     message: `Changes saved successfully`,
        //   })
        //   this.$emit('update:visible', false)
        // } else if (error) {
        //   const firstError = error.violations[Object.keys(error.violations)[0]][0]
        //   this.$notify({
        //     type: 'error',
        //     title: 'Error',
        //     message: firstError,
        //   })
        // }
      }
    },
    validateAll() {
      const result = []
      this.$refs.form.validate( valid => {
        result.push(valid)
      })
      return result
    },
  },
}
</script>

<template>
  <el-dialog
    title="Edit Anniversary Date"
    :custom-class="$style.wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="modal-form"
      label-width="200px"
      label-position="top"
    >
      <el-form-item
        label="Endpoint URL"
        prop="url"
      >
        <el-input
          v-model="form.url"
          :disabled="edit"
        />
      </el-form-item>

      <el-form-item
        label="Version"
        prop="version"
      >
        <el-select
          v-model="form.version"
        >
          <el-option
            v-for="version in allVersions"
            :key="version.value"
            :value="version.value"
            :label="version.label"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="Events to send"
        prop="events"
      >
        <el-select
          v-model="form.events"
          multiple
        >
          <el-option
            v-for="event in allEvents"
            :key="event.value"
            :value="event.value"
            :label="event.label"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="modal__footer">
      <el-button
        type="primary"
        :class="$style.save"
        @click="onSubmit"
      >
        Save
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.wrapper {
  width: 32rem;
}

.save {
  width: 15rem !important;
}
</style>
