<script>
import { datePickerFormat } from '@lib/utils/date-helper'
import { mask } from 'vue-the-mask'
import MultipleSelect from '~/components/multiple-select'

const EVENTS = [{
  name: 'Event 1',
  id: '123',
}, {
  name: 'Event 2',
  id: '345',
}]

export default {
  name: 'RuleCreateModal',
  directives: {
    mask,
  },
  components: {
    MultipleSelect,
  },
  data() {
    const date = new Date()

    return {
      datePickerFormat,
      providers: ['Suncorp', 'Optus', 'PA', 'Guild Super'],
      events: EVENTS,
      form: {
        name: '',
        type: 'Earn',
        provider: 'Suncorp',
        events: [EVENTS[0].id],
        ruleExpression: '',
        enabled: true,
        startAt: date,
        finishAt: date,
        priority: 0,
      },
      rules: {
        name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
      progress: false,
    }
  },
  methods: {
    addEvent() {
      this.form.events.push(EVENTS[0].id)
    },
    removeEvent(index) {
      this.form.events.splice(index, 1)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        this.progress = true

        setTimeout(() => {
          this.progress = false
          this.$emit('success')
        }, 1000)
      })
    },
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-dialog
      title="Create Rule"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="180px"
          label-position="top"
        >
          <el-form-item
            label="Rule Name"
            prop="name"
            required
          >
            <el-input v-model="form.name" />
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
                label="Earn"
                :class="$style.radio"
              >
                Earn
              </el-radio>
              <el-radio
                label="Burn"
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
            >
              <el-option
                v-for="(provider, index) in providers"
                :key="index"
                :label="provider"
                :value="provider"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Event Name"
            prop="events"
          >
            <multiple-select
              :values="form.events"
              :items="events"
              @add="addEvent"
              @remove="removeEvent"
            />
          </el-form-item>
          <el-form-item
            label="Rule Expression"
            prop="ruleExpression"
          >
            <el-input
              v-model="form.ruleExpression"
              type="textarea"
              :rows="4"
            />
          </el-form-item>
          <el-form-item prop="enabled">
            <el-switch
              v-model="form.enabled"
              active-color="#13ce66"
              inactive-color="#a7a7a7"
            />
            <span
              :class="[
                $style.switchLabel,
                form.enabled && $style.switchLabelActive,
              ]"
            >
              Rule {{ form.enabled ? 'Enabled' : 'Disabled' }}
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
        </el-form>
        <div
          slot="footer"
          class="modal__footer"
        >
          <el-button
            type="primary"
            class="el-button--wide"
            :loading="progress"
            @click="onSubmit"
          >
            Save
          </el-button>
        </div>
      </div>
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
