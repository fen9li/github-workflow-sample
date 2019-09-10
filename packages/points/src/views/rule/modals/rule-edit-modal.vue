<script>
import MultipleSelect from '~/components/multiple-select'
import { mapActions, mapState } from 'vuex'
import { datePickerFormat } from '@lib/utils/date-helper'
import { mask } from 'vue-the-mask'
import pick from 'lodash/pick'

export default {
  name: 'RuleEditModal',
  components: {
    MultipleSelect,
  },
  directives: {
    mask,
  },
  props: {
    rule: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      datePickerFormat,
      form: {
        name: null,
        type: null,
        provider: null,
        events: [],
        expression: null,
        status: false,
        startAt: null,
        finishAt: null,
        priority: null,
      },
      rules: {},
      progress: false,
      loaded: false,
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

    this.form = pick(this.rule, [
      'name',
      'type',
      'provider',
      'events',
      'expression',
      'startAt',
      'finishAt',
      'priority',
      'active',
    ])
  },
  methods: {
    ...mapActions('providers', ['getProviders']),
    ...mapActions('events', ['getEvents']),
    ...mapActions('rule', ['updateRule']),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)

      if (!formValid) {
        return
      }

      this.progress = true
      const [error] = await this.updateRule({
        ruleId: this.rule.id,
        form: this.form,
      })
      this.progress = false

      if (error) {
        return
      }
      this.$emit('success')
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      title="Edit Rule"
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
        :rules="rules"
        label-width="180px"
        label-position="top"
      >
        <el-form-item
          label="Rule Name"
          prop="name"
        >
          <el-input
            :value="form.name"
            disabled
          />
        </el-form-item>
        <el-form-item
          label="Event Type"
          prop="type"
          required
        >
          <el-radio-group
            v-model="form.type"
            prop="type"
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
          label="Provider Name"
          prop="provider"
        >
          <el-select
            v-model="form.provider"
            placeholder="Select provider..."
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
          label="Rule Expression"
          prop="expression"
        >
          <el-input
            v-model="form.expression"
            type="textarea"
            :rows="4"
          />
        </el-form-item>
        <el-form-item prop="active">
          <el-switch
            v-model="form.active"
            active-color="#13ce66"
            inactive-color="#a7a7a7"
          />
          <span
            :class="[
              $style.switchLabel,
              form.active && $style.switchLabelActive,
            ]"
          >
            Rule {{ form.active ? 'Enabled' : 'Disabled' }}
          </span>
        </el-form-item>
        <div :class="$style.dates">
          <el-form-item
            label="Rule Start Date"
            prop="startAt"
          >
            <el-date-picker
              v-model="form.startAt"
              v-mask="['##/##/####']"
              type="date"
              format="dd/MM/yyyy"
              :value-format="datePickerFormat"
              placeholder="Enter Date"
            />
          </el-form-item>
          <el-form-item
            label="Rule End Date"
            prop="finishAt"
          >
            <el-date-picker
              v-model="form.finishAt"
              v-mask="['##/##/####']"
              type="date"
              format="dd/MM/yyyy"
              :value-format="datePickerFormat"
              placeholder="Enter Date"
            />
          </el-form-item>
        </div>
        <el-form-item
          label="Rule Priority (0 - 5000)"
          prop="priority"
        >
          <el-input v-model="form.priority" />
        </el-form-item>
        <div class="modal__footer">
          <el-button
            type="primary"
            class="el-button--wide"
            :loading="progress"
            @click="onSubmit"
          >
            Save
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  :global {
    .el-dialog {
      max-width: 35rem !important;
    }

    .el-form-item {
      .el-checkbox-group {
        width: 100%;
      }
    }
  }
}

.radio {
  &:not(:last-child) {
    margin-right: rem(64px);
  }
}

.switchLabel {
  margin-left: rem(14px);
}

.switchLabelActive {
  color: #13ce66;
}

.dates {
  display: flex;
  justify-content: space-between;
}
</style>
