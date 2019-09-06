<script>
import { mapActions, mapState } from 'vuex'
import MultipleSelect from '~/components/multiple-select.vue'
import pick from 'lodash/pick'

const EventsList = [
  {
    name: 'Event 1',
    id: '123',
  },
  {
    name: 'Event 2',
    id: '345',
  },
]

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
      EventsList,
      form: {
        name: '',
        type: '',
        providerName: '',
        eventName: '',
        expression: '',
        enabled: '',
        strict: '',
        startAt: '',
        endAt: '',
        priority: '',
        events: [],
      },
    }
  },
  computed: {
    ...mapState('providers', ['providers']),
    providerNames() {
      const { providers } = this

      if (providers && providers.length) {
        return providers.map(p => ({
          label: p.name,
          value: p.name,
        }))
      }

      return []
    },
  },
  created() {
    if (!this.isEdit) {
      return
    }

    this.form = {
      ...pick(this.limit, [
        'name',
        'type',
        'providerName',
        'eventName',
        'expression',
        'enabled',
        'strict',
        'startAt',
        'endAt',
        'priority',
      ]),
    }
  },
  methods: {
    ...mapActions('limit', ['createLimit', 'updateLimit']),
    addEvent() {
      this.form.events.push(this.EventsList[0].id)
    },
    removeEvent(index) {
      this.form.events.splice(index, 1)
    },
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)

      if (!formValid) {
        return
      }

      this.progress = true

      if (this.isEdit) {
        await this.updateLimit({
          limitId: this.limit.id,
          form: this.form,
        })
      } else {
        await this.createLimit(this.form)
      }

      this.$emit('close-modal')
      this.$emit('done')
      this.progress = false
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
    <el-form
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
        required
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
        required
        prop="providerName"
        label="Provider Name"
      >
        <el-select v-model="form.providerName">
          <el-option
            v-for="name in providerNames"
            :key="name.label"
            :label="name.label"
            :value="name.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="Event Name"
        prop="events"
      >
        <multiple-select
          :values="form.events"
          :items="EventsList"
          @add="addEvent"
          @remove="removeEvent"
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
        />
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="form.enabled">
          Limit Enabled
        </el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-checkbox v-model="form.strict">
          Limit Strict Enabled
        </el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-col :span="11">
          <el-form-item
            label="Limit Start Date"
            prop="startAt"
            required
          >
            <el-date-picker
              v-model="form.startAt"
              type="date"
              placeholder="Enter Date"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" />
        <el-col :span="11">
          <el-form-item
            label="Limit End Date"
            prop="endAt"
            required
          >
            <el-date-picker
              v-model="form.endAt"
              type="date"
              placeholder="Enter Date"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item
        label="Limit Priority (0 - 5000)"
        prop="priority"
        required
      >
        <el-input-number
          v-model="form.priority"
          class="el-col el-col-24"
          :min="0"
          :max="5000"
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
