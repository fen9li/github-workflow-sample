<script>
import get from 'lodash/get'
import has from 'lodash/has'
import cloneDeep from 'lodash/cloneDeep'
import { formatDate } from '@lib/utils/format-date'
import EditLayoutImage from './components/edit-layout-image'
import EditLayoutCategories from './components/edit-layout-categories'
import EditLayoutTable from './components/edit-layout-table'
import PresetField from './preset-field.vue'

export default {
  name: 'EditLayout',
  components: {
    EditLayoutImage,
    EditLayoutCategories,
    EditLayoutTable,
    PresetField,
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
    footer: {
      type: Object,
      default: () => {},
    },
    isRemove: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    dividerStyles() {
      return {
        gridColumn: `1/${2 + this.presets.length}`,
      }
    },
    isChanged() {
      return this.fields.some(f => f.changed)
    },
    formMapForValidation() {
      // el-form can't work with nested fields
      const { form } = this
      const validationMap = {}

      for (const fieldName in form) {
        if (form.hasOwnProperty(fieldName)) {
          validationMap[fieldName] = form[fieldName].value
        }
      }

      return validationMap
    },
  },
  watch: {
    source: {
      handler() {
        this.fillFormFromSource()
      },
      immediate: true,
    },
  },
  methods: {
    fillFormFromSource() {
      const { source, fields } = this
      const newForm = {}

      fields.forEach(field => {
        const { key, path } = field

        if (key) {
          newForm[key] = {
            value: cloneDeep(get(source, path, '')),
          }
        }
      })

      this.form = newForm
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
    changeField(field) {
      field.changed = true
      field.value = this.form[field.key].value
    },
    checkChanged(values, field) {
      this.form[field.key].value = values
      this.changeField(field)
    },
    imageLoaded(image, field) {
      this.form[field.key].value = image
      this.changeField(field)
    },
    checkPresetField(checked, sourcePreset, field, value) {
      const { key, path } = field
      const { form, presets } = this

      if (checked) {
        form[key] = { value }

        // uncheck all other presets
        presets.forEach(preset => {
          if (preset !== sourcePreset) {
            preset.selected = false
            preset.items[key].selected = false
          }
        })

        // check if all items in preset are selected
        let isAllSelected = true
        const sourcePresetItems = sourcePreset.items

        for (const itemKey in sourcePresetItems) {
          const item = sourcePresetItems[itemKey]

          if (
            sourcePresetItems.hasOwnProperty(itemKey) &&
            item.type !== 'text' &&
            item.isSelectable &&
            !item.selected
          ) {
            isAllSelected = false
            break
          }
        }

        if (isAllSelected) {
          sourcePreset.selected = true
        }

        // mark the field as changed
        field.changed = true
      } else {
        // return source values
        form[key] = { value: cloneDeep(get(this.source, path, '')) }
        presets.forEach(preset => {
          preset.selected = false
        })

        field.changed = false
      }

      field.value = form[key].value
    },
    selectAll(checked, sourcePreset) {
      const { form, presets } = this

      for (const preset of presets) {
        const { items } = preset
        const isChecked = checked && preset === sourcePreset

        preset.selected = isChecked

        for (const key of Object.keys(items)) {
          const item = items[key]

          if (item.isSelectable) {
            item.selected = isChecked
          }
        }

        if (preset === sourcePreset) {
          for (const field of this.fields) {
            const { key, path } = field

            // check if field editable
            if (field.component) {
              if (checked) {
                if (!has(preset, `items.${key}.value`)) {
                  continue
                }

                form[key] = {
                  value: get(preset, `items.${key}.value`),
                }
              } else {
                form[key] = {
                  value: cloneDeep(get(this.source, path)),
                }
              }

              if (get(preset, `items.${key}.isSelectable`, true)) {
                field.changed = checked
                field.value = form[key].value
              }
            }
          }
        }
      }
    },
    isSelected(field) {
      const { presets } = this
      const { key } = field
      const presetsCount = presets.length

      for (let i = 0; i < presetsCount; i++) {
        const fieldInPreset = presets[i].items[key]
        const selected = get(fieldInPreset, 'selected', false)
        const isSelectable = get(fieldInPreset, 'isSelectable', true)

        if (selected && isSelectable) {
          return true
        }
      }

      return false
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('update')
        }
      })
    },
    getPath(path, def = '') {
      return get(this.source, path, def)
    },
    formatValue(field) {
      const format = get(field, 'format', el => el)
      return format(this.form[field.key].value)
    },
  },
}
</script>

<template>
  <el-card :class="$style.card">
    <el-form
      ref="form"
      :model="formMapForValidation"
      :class="$style.form"
      label-position="top"
    >
      <div :class="$style.grid">
        <div
          :class="$style.divider"
          :style="dividerStyles"
        />
        <div :class="$style.columnHeader">
          <div :class="$style.columnTitle">
            Current Details
          </div>
        </div>
        <template v-for="(field, fieldIndex) in fields">
          <template v-if="field.type === 'divider'">
            <div
              :key="fieldIndex"
              :class="$style.footerDivider"
              :style="{
                ...dividerStyles,
                gridRowStart: 3 + fieldIndex,
              }"
            />
            <slot
              v-if="field.slot"
              :name="field.slot"
              :slotStyles="{
                ...dividerStyles,
                gridRowStart: 3 + fieldIndex,
              }"
            />
          </template>
          <el-form-item
            v-else
            :key="fieldIndex"
            :label="field.label"
            :prop="field.key"
            :rules="field.rules"
            :class="$style.columnItem"
            :style="{
              gridRowStart: 3 + fieldIndex,
            }"
          >
            <component
              :is="field.component"
              v-if="field.component"
              v-model="form[field.key].value"
              v-bind="field.componentBindings"
              :disabled="isSelected(field)"
              @input="changeField(field)"
              @checked="checkChanged($event, field)"
              @imageLoaded="imageLoaded($event, field)"
            >
              <template
                v-for="slot in field.componentSlots"
                :slot="slot.name"
              >
                {{ getPath(slot.path) || 'URL' }}
              </template>
            </component>
            <div
              v-else
              :class="$style.contentValue"
            >
              {{ formatValue(field) }}
            </div>
          </el-form-item>
        </template>
        <!-- Feeds part -->
        <template v-for="(preset, index) in presets">
          <div
            :key="`all.${index}`"
            :class="[$style.columnHeader, $style.columnFeedHeader]"
          >
            <div :class="$style.columnTitle">
              {{ preset.title }}
              <span
                v-if="preset.updated"
                :class="$style.feedUpdated"
              >
                Updated
              </span>
            </div>
            <el-checkbox
              v-model="preset.selected"
              label="Select All"
              @input="selectAll($event, preset)"
            />
          </div>
          <template v-for="(field, fieldIndex) in fields">
            <div
              v-if="preset.items[field.key]"
              :key="`${index}-${fieldIndex}`"
              :class="[$style.columnItem, $style.columnFeed]"
              :style="{
                gridRowStart: 3 + fieldIndex,
              }"
            >
              <preset-field
                :preset="preset"
                :field="field"
                @checked="checkPresetField"
              />
            </div>
          </template>
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
.card {
  overflow: unset; // NOTE: fix scroll perfomance
}

.form {
  overflow-x: auto;
  overflow-y: hidden;
}

.grid {
  display: grid;
  grid-template-rows: auto rem(66px) auto; // 32 top margin + 32 bottom margin + 2 height
  grid-auto-flow: column dense;
}

.divider,
.footerDivider {
  width: 100%;
  margin: rem(32px 0);
  border-top: 2px dashed var(--color-primary);
}

.divider {
  grid-row-start: 2;
}

.columnHeader {
  grid-row-start: 1;
  min-width: rem(300px);
}

.columnHeader,
.columnItem {
  max-width: rem(400px);
}

.columnItem {
  :global {
    .el-radio-group {
      margin: rem(0 0 10px 0);
    }

    .el-radio__label {
      padding-left: rem(24px);
    }
  }
}

.columnFeedHeader {
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
  padding-bottom: rem(24px);
  padding-left: rem(48px);

  :global(.el-checkbox) {
    margin-bottom: rem(8px);
  }

  > span,
  > div,
  > img {
    margin-left: rem(38px);
  }
}

.columnFeed > section > span,
.columnFeed > section > div,
.contentValue {
  font-size: rem(14px);
  color: var(--color-dark-gray);
}

.footer {
  display: flex;
  justify-content: space-between;
  padding-top: rem(16px);
}

.feedUpdated {
  position: relative;
  top: rem(-3px);
  padding: rem(4px 12px);
  font-size: rem(12px);
  font-weight: normal;
  color: white;
  background-color: #14be21;
  border-radius: rem(18px);
}
</style>
