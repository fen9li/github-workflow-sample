<script>
import get from 'lodash/get'
import { formatDate } from '@lib/utils/format-date'
import EditLayoutImage from './components/edit-layout-image'
import EditLayoutCategories from './components/edit-layout-categories'
import Uploadcare from 'uploadcare-vue'

export default {
  name: 'EditLayout',
  components: {
    Uploadcare,
    EditLayoutImage,
    EditLayoutCategories,
  },
  props: {
    source: {
      type: Object,
      default: () => {},
    },
    fields: {
      type: Array,
      default: () => [],
    },
    presets: {
      type: Array,
      default: () => [],
    },
    isRemove: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      form: {},
      isChanged: false,
    }
  },
  watch: {
    source() {
      this.offerToForm()
    },
  },
  created() {
    this.offerToForm()
  },
  methods: {
    offerToForm() {
      const newForm = {}

      for (const field of this.fields) {
        newForm[field.key] = get(this.source, field.path, '')
      }

      this.form = newForm
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
    changeField(field) {
      field.changed = true
      field.value = this.form[field.key]
      this.isChanged = true
    },
    imageLoaded(image, field) {
      this.form[field.key] = image
      this.changeField(field)
    },
    checkPresetField(checked, sourcePreset, field, value) {
      const { key, path } = field

      if (checked) {
        this.form[key] = value
        this.presets.forEach(preset => {
          if (preset !== sourcePreset) {
            preset.selected = false
            preset.items[key].selected = false
          }
        })

        // check if all items in preset is selected
        let isAllSelected = true
        for (const key of Object.keys(sourcePreset.items)) {
          if (!sourcePreset.items[key].selected) {
            isAllSelected = false
            break
          }
        }
        if (isAllSelected) {
          sourcePreset.selected = true
        }
      } else {
        this.form[key] = get(this.source, path, '')
        this.presets.forEach(preset => {
          preset.selected = false
        })
      }

      field.changed = true
      field.value = this.form[field.key]
      this.isChanged = true
    },
    selectAll(checked, sourcePreset) {
      for (const preset of this.presets) {
        const { items } = preset
        const isChecked = checked && preset === sourcePreset

        for (const key of Object.keys(items)) {
          preset.selected = isChecked
          items[key].selected = isChecked
        }

        if (preset === sourcePreset) {
          for (const field of this.fields) {
            field.changed = checked
            if (checked) {
              field.value = get(preset, `items.${ field.key }.value`)
            } else {
              field.value = this.form[field.key]
            }
          }
        }
      }

      this.isChanged = true
    },
    isSelected(field) {
      const { key } = field

      for (const preset of this.presets) {
        if (get(preset.items[key], 'selected', false)) {
          return true
        }
      }

      return false
    },
    isUpdated(preset) {
      const { selected, items } = preset

      if (selected) {
        return true
      }

      for (const key of Object.keys(items)) {
        if (get(items[key], 'selected', false)) {
          return true
        }
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        this.$emit('update')
      })
    },
  },
}
</script>

<template>
  <el-card>
    <el-form
      ref="form"
      :model="form"
      :class="$style.form"
      label-position="top"
    >
      <div :class="$style.grid">
        <div :class="$style.divider" />
        <div :class="$style.columnHeader">
          <div :class="$style.columnTitle">
            Current Details
          </div>
        </div>
        <el-form-item
          v-for="(field, fieldIndex) in fields"
          :key="fieldIndex"
          :label="field.label"
          :prop="field.key"
          :rules="field.rules"
          :style="{
            gridRowStart: 3 + fieldIndex,
          }"
        >
          <component
            :is="field.type"
            v-model="form[field.key]"
            v-bind="field.typeBindings"
            :disabled="isSelected(field)"
            @input="changeField(field)"
            @imageLoaded="imageLoaded($event, field)"
          >
            <template
              v-for="slot in field.slots"
              :slot="slot.name"
            >
              {{ slot.value }}
            </template>
          </component>
        </el-form-item>
        <!-- Feeds part -->
        <template v-for="(preset, index) in presets">
          <div
            :key="`all.${ index }`"
            :class="[$style.columnHeader, $style.columnFeedHeader]"
          >
            <div :class="$style.columnTitle">
              {{ isUpdated(preset) ? 'Updated - ' : null }}{{ preset.title }}
            </div>
            <el-checkbox
              v-model="preset.selected"
              label="Select All"
              @input="selectAll($event, preset)"
            />
          </div>
          <div
            v-for="(field, fieldIndex) in fields"
            :key="`${ index }-${ fieldIndex }`"
            :class="$style.columnFeed"
            :style="{
              gridRowStart: 3 + fieldIndex,
            }"
          >
            <template v-if="preset.items[field.key]">
              <el-checkbox
                v-model="preset.items[field.key].selected"
                :label="field.label"
                @input="checkPresetField($event, preset, field, preset.items[field.key].value)"
              />
              <span>{{ preset.items[field.key].label || preset.items[field.key].value }}</span>
            </template>
          </div>
        </template>
      </div>
      <div :class="$style.footer">
        <div>
          <el-button
            v-if="isRemove"
            type="danger"
            @click="$emit('remove')"
          >
            <slot name="removeButton">
              Remove
            </slot>
          </el-button>
        </div>
        <div>
          <el-button @click="$emit('cancel')">
            <slot name="cancelButton">
              Cancel
            </slot>
          </el-button>
          <slot name="cancelButton" />
          <el-button
            type="primary"
            :disabled="!isChanged"
            @click="submitForm"
          >
            <slot name="updateButton">
              Update
            </slot>
          </el-button>
        </div>
      </div>
    </el-form>
  </el-card>
</template>

<style lang="scss" module>
.form {
  overflow-x: auto;
  overflow-y: hidden;
}

.grid {
  display: grid;
  grid-template-rows: auto rem(66px) auto; // 32 top margin + 32 bottom margin + 2 height
  grid-auto-flow: column dense;
}

.divider {
  grid-row-start: 2;
  grid-column: 1/999;
  margin: rem(32px 0);
  border-bottom: 2px dashed var(--color-primary);
}

.columnHeader {
  grid-row-start: 1;
  min-width: 300px;
}

.columnFeedHeader {
  max-width: rem(400px);
  padding-left: rem(48px);
}

.columnTitle {
  margin-bottom: 1.4rem;
  overflow: hidden;
  font-size: 1.4rem;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.columnFeed {
  display: flex;
  flex-direction: column;
  max-width: rem(400px);
  padding-top: rem(24px);
  padding-left: rem(48px);

  :global(.el-checkbox) {
    margin-bottom: rem(8px);
  }

  > span {
    margin-left: rem(38px);
    font-size: rem(14px);
    color: var(--color-dark-gray);
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding-top: rem(16px);
}
</style>
