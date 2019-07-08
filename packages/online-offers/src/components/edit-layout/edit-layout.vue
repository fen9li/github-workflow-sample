<script>
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import { formatDate } from '@lib/utils/format-date'
import EditLayoutImage from './components/edit-layout-image'
import EditLayoutCategories from './components/edit-layout-categories'
import EditLayoutTable from './components/edit-layout-table'
import Uploadcare from 'uploadcare-vue'

export default {
  name: 'EditLayout',
  components: {
    Uploadcare,
    EditLayoutImage,
    EditLayoutCategories,
    EditLayoutTable,
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
      isChanged: false,
    }
  },
  computed: {
    dividerStyles() {
      return {
        gridColumn: `1/${ 2 + this.presets.length }`,
      }
    },
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
        newForm[field.key] = cloneDeep(get(this.source, field.path, ''))
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
    checkChanged(values, field) {
      this.form[field.key] = values
      this.changeField(field)
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
        this.form[key] = cloneDeep(get(this.source, path, ''))
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
        <div
          :class="$style.divider"
          :style="dividerStyles"
        />
        <div :class="$style.columnHeader">
          <div :class="$style.columnTitle">
            Current Details
          </div>
        </div>
        <!-- :key="fieldIndex" -->
        <template
          v-for="(field, fieldIndex) in fields"
        >
          <template
            v-if="field.type === 'divider'"
          >
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
              v-model="form[field.key]"
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
                {{ slot.value }}
              </template>
            </component>
          </el-form-item>
        </template>
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
          <template
            v-for="(field, fieldIndex) in fields"
          >
            <template
              v-if="preset.items[field.key]"
            >
              <div
                :key="`${ index }-${ fieldIndex }`"
                :class="[$style.columnItem, $style.columnFeed]"
                :style="{
                  gridRowStart: 3 + fieldIndex,
                }"
              >
                <el-radio-group
                  v-if="preset.items[field.key].type === 'radio'"
                  v-model="preset.items[field.key].value"
                  @input="checkPresetField($event, preset, field, preset.items[field.key].value)"
                >
                  <el-radio
                    :label="preset.items[field.key].value"
                  />
                </el-radio-group>
                <el-checkbox
                  v-else-if="preset.items[field.key]"
                  v-model="preset.items[field.key].selected"
                  :label="field.label"
                  @input="checkPresetField($event, preset, field, preset.items[field.key].value)"
                />
                <img
                  v-if="preset.items[field.key].preview === 'image'"
                  :src="preset.items[field.key].value"
                  :alt="preset.items[field.key].label || preset.items[field.key].value"
                  :class="$style.feedImage"
                >
                <component
                  :is="preset.items[field.key].component"
                  v-else-if="preset.items[field.key].component"
                  v-model="preset.items[field.key].value"
                  :class="$style.feedLabel"
                  v-bind="preset.items[field.key].componentBindings"
                />
                <span :class="$style.feedLabel">
                  {{ preset.items[field.key].label || preset.items[field.key].value }}
                </span>
              </div>
            </template>
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
  > div {
    margin-left: rem(38px);
    font-size: rem(14px);
    color: var(--color-dark-gray);
  }
}

.feedLabel {
  max-height: rem(200px);
  overflow-y: auto;
  line-height: normal;
}

.feedImage {
  max-width: rem(100px);
}

.footer {
  display: flex;
  justify-content: space-between;
  padding-top: rem(16px);
}
</style>
