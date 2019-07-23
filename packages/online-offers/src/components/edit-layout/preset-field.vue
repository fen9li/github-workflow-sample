<script>
import EditLayoutImage from './components/edit-layout-image'
import EditLayoutCategories from './components/edit-layout-categories'
import EditLayoutTable from './components/edit-layout-table'
export default {
  name: 'EditLayoutPresetField',
  components: {
    EditLayoutImage,
    EditLayoutCategories,
    EditLayoutTable,
  },
  props: {
    preset: {
      type: Object,
      required: true,
    },
    field: {
      type: Object,
      required: true,
    },
  },
  computed: {
    item() {
      return this.preset.items[this.field.key]
    },
    itemValue() {
      return this.item.value
    },
    itemLabel() {
      return this.item.label
    },
  },
}
</script>

<template>
  <section>
    <el-radio-group
      v-if="item.type === 'radio'"
      v-model="item.value"
      @input="$emit('checked', $event, preset, field, itemValue)"
    >
      <el-radio :label="itemValue" />
    </el-radio-group>
    <div v-else-if="item.type === 'text'">
      <span :class="$style.checkboxLabel">
        {{ field.label }}
      </span>
    </div>
    <el-checkbox
      v-else
      v-model="item.selected"
      :label="field.label"
      @input="$emit('checked', $event, preset, field, itemValue)"
    />

    <img
      v-if="item.preview === 'image'"
      :src="itemValue"
      :alt="itemLabel || itemValue"
      :class="$style.image"
    >
    <component
      :is="item.component"
      v-else-if="item.component"
      v-model="item.value"
      :class="$style.label"
      v-bind="item.componentBindings"
    />
    <span
      v-if="itemLabel !== false"
      :class="$style.label"
    >
      {{ itemLabel || itemValue }}
    </span>
  </section>
</template>

<style lang="scss" module>
  .label {
    display: inline-block;
    max-height: rem(200px);
    padding-left: rem(38px);
    overflow-y: auto;
    line-height: normal;
    vertical-align: top;
  }
  .checkboxLabel {
    padding-left: rem(38px);
    font-size: 1rem;
    color: var(--color-text);
  }
  .image {
    max-width: rem(100px);
    padding-left: rem(38px);
    margin-bottom: rem(10px);
  }
</style>
