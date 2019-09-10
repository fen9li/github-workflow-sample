<script>
import { mapActions } from 'vuex'
export default {
  name: "EventModalSuper",
  props: {
    event: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      progress: false,
      form: {},
      rules: {},
    }
  },
  mounted() {
    if (this.event) this.form = { ...this.event }
  },
  methods: {
    ...mapActions('event', ['createEvent', 'updateEvent']),
    async onSubmit() {
      this.progress = true

      const [error, response] = await this[this.event && this.event.id ? 'updateEvent' : 'createEvent'](this.form)

      if (error) {
        if (Object.keys(error.violations).length !== 0) {
          Object.keys(error.violations).forEach(key => {
            this.$notify({
              type: 'error',
              title: 'Error',
              message: error.violations[key] && error.violations[key][0],
            })
          })
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            message: error.message,
          })
        }
      }

      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Successfuly ${this.event && this.event.id ? 'updated' : 'created'}.`,
        })
        this.$emit('close-modal')
      }

      this.progress = false
    }
  },
}
</script>

<template>
  <el-dialog
    :title="event ? 'Edit Event' : 'Create Event'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        label="Event Name"
        required
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="Event Type"
        required
      >
        <el-radio-group
          v-model="form.type"
        >
          <el-radio
            label="earn"
            :class="$style.radio"
          >
            Earn
          </el-radio>
          <el-radio
            label="burn"
            :class="$style.radio"
          >
            Burn
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="Event Slug"
        required
      >
        <el-input v-model="form.slug" />
      </el-form-item>
      <el-form-item
        label="Event Default Value"
        required
      >
        <el-input v-model="form.defaultValue" />
      </el-form-item>
      <el-form-item
        label="Provider Name"
      >
        <el-input
          v-model="form.providerName"
          disabled
        />
      </el-form-item>
      <el-button
        type="primary"
        :class="$style.button"
        :loading="progress"
        :disabled="progress"
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

</style>
