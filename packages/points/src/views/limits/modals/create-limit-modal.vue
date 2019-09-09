<script>
import { mapActions, mapState } from 'vuex'
import MultipleSelect from '~/components/multiple-select.vue'
import pick from 'lodash/pick'
import dateIsAfter from '@lib/utils/date-is-after'
import dateIsPast from '@lib/utils/date-is-past'
import dateIsSame from '@lib/utils/date-is-same'

export default {
  name: 'CreateLimitModal',
  components: {
    MultipleSelect,
  },
  props: {
    limit: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      progress: false,
      form: {
        name: '',
        type: 'earn',
        providerId: '',
        eventName: '',
        expression: '',
        enabled: false,
        strict: false,
        startAt: null,
        endAt: null,
        priority: -1,
        events: [],
      },
      loaded: false,
      enableSwitchDisabled: false,
    }
  },
  computed: {
    ...mapState('providers', ['providers']),
    ...mapState('events', ['events']),
  },
  created() {
    Promise.all([this.getProviders(), this.getEvents()]).then(() => {
      this.loaded = true
    })

    if (!this.isEdit) {
      return
    }

    this.form = {
      ...this.form,
      ...pick(this.limit, [
        'name',
        'type',
        'providerId',
        'eventName',
        'expression',
        'enabled',
        'strict',
        'startAt',
        'endAt',
        'priority',
        'events',
      ]),
    }
  },
  methods: {
    ...mapActions('globalLimit', ['createGlobalLimit', 'updateGlobalLimit']),
    ...mapActions('providers', ['getProviders']),
    ...mapActions('events', ['getEvents']),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)

      if (!formValid) {
        return
      }

      this.progress = true

      if (this.isEdit) {
        await this.updateGlobalLimit({
          limitId: this.limit.id,
          form: this.form,
        })
      } else {
        await this.createGlobalLimit(this.form)
      }

      this.$emit('close-modal')
      this.$emit('done')
      this.progress = false
    },
    onStartDateSet(newVal) {
      const { form } = this
      const { endAt } = form

      if (endAt) {
        const isBeforeEnd = dateIsAfter(endAt, newVal)
        const isSameAsEnd = dateIsSame(endAt, newVal)

        if (isBeforeEnd || isSameAsEnd) {
          form.startAt = newVal
        }
      } else {
        form.startAt = newVal
      }
    },
    onEndDateSet(newVal) {
      const { startAt } = this.form

      if (startAt) {
        const isAfterStart = dateIsAfter(newVal, startAt)
        const isSameAsStart = dateIsSame(newVal, startAt)

        if (isAfterStart || isSameAsStart) {
          this.setEndDate(newVal)
        }
      } else {
        this.setEndDate(newVal)
      }
    },
    setEndDate(endDate) {
      this.form.endAt = endDate

      if (dateIsPast(endDate)) {
        this.form.enabled = false
        this.enableSwitchDisabled = true
      }
      else {
        this.enableSwitchDisabled = false
      }
    },
  },
}
</script>

<template>
  <el-dialog
    :title="`${isEdit ? 'Edit' : 'Create'} Limit`"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div
      v-if="!loaded"
      v-loading="true"
      class="modal-loader"
    />

    <el-form
      v-else
      ref="form"
      :model="form"
      label-position="top"
      :disabled="progress"
    >
      <el-form-item
        v-if="isEdit && limit"
        label="Limit ID"
      >
        <el-input
          :value="limit.id"
          disabled
        />
      </el-form-item>

      <el-form-item
        required
        prop="name"
        label="Limit name"
      >
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item
        prop="type"
        label="Limit type"
      >
        <el-radio
          v-model="form.type"
          label="earn"
        >
          Earn
        </el-radio>
        <el-radio
          v-model="form.type"
          label="burn"
        >
          Burn
        </el-radio>
      </el-form-item>

      <el-form-item
        prop="providerId"
        label="Provider Name"
      >
        <el-select
          v-model="form.providerId"
          clearable
        >
          <el-option
            v-for="provider in providers"
            :key="provider.id"
            :label="provider.name"
            :value="provider.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="Event Name"
        prop="events"
      >
        <multiple-select
          v-model="form.events"
          :items="events"
        />
      </el-form-item>

      <el-form-item
        label="Limit Rule Expression"
        prop="expression"
      >
        <el-input
          v-model="form.expression"
          type="textarea"
          :rows="4"
          maxlength="3000"
        />
      </el-form-item>

      <el-form-item>
        <el-switch
          v-model="form.enabled"
          active-color="#13ce66"
          inactive-color="#a7a7a7"
          :disabled="enableSwitchDisabled"
        />
        <span
          :class="[
            $style.switchLabel,
            form.enabled && $style.switchLabelActive,
          ]"
        >
          Limit Enabled
        </span>
      </el-form-item>

      <el-form-item>
        <el-switch
          v-model="form.strict"
          active-color="#13ce66"
          inactive-color="#a7a7a7"
        />
        <span
          :class="[$style.switchLabel, form.strict && $style.switchLabelActive]"
        >
          Limit Strict Enabled
        </span>
      </el-form-item>

      <el-form-item>
        <el-col :span="11">
          <el-form-item
            label="Limit Start Date"
            prop="startAt"
          >
            <el-date-picker
              :value="form.startAt"
              type="date"
              placeholder="Enter Date"
              @input="onStartDateSet"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" />
        <el-col :span="11">
          <el-form-item
            label="Limit End Date"
            prop="endAt"
          >
            <el-date-picker
              :value="form.endAt"
              type="date"
              placeholder="Enter Date"
              @input="onEndDateSet"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item
        label="Limit Priority (-4999 - 10001)"
        prop="priority"
      >
        <el-input-number
          v-model="form.priority"
          class="el-col el-col-24"
          :min="-4999"
          :max="10001"
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

.switchLabel {
  margin-left: rem(14px);
}

.switchLabelActive {
  color: #13ce66;
}
</style>
