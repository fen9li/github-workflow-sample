<script>
export default {
  name: 'MultipleSelect',
  props: {
    value: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select...',
    },
  },
  data() {
    return {
      localValues: [],
    }
  },
  computed: {
    availableItems() {
      const { localValues } = this

      return this.items.filter(i => localValues.indexOf(i.id) === -1)
    },
    canAddItems() {
      const { items, value } = this

      return items.length !== value.length
    },
  },
  watch: {
    value: {
      handler(newValue) {
        if (newValue.length) {
          this.localValues = [].concat(newValue)
        } else {
          this.localValues = ['']
        }
      },
      deep: true,
      immediate: true,
    },
    localValues: {
      handler(localValues) {
        const nonEmptyLocalValues = localValues.filter(Boolean)

        if (nonEmptyLocalValues.length !== this.value.length) {
          this.$emit('input', nonEmptyLocalValues)
        }
      },
      deep: true,
    },
  },
  methods: {
    addItem() {
      this.localValues.push('')
    },
    removeItem(idx) {
      this.localValues.splice(idx, 1)
    },
  },
}
</script>

<template>
  <div :class="$style.container">
    <el-button
      v-if="canAddItems"
      type="text"
      :class="$style.newButton"
      @click="addItem"
    >
      <i class="el-icon-plus" />
      Add Event
    </el-button>
    <div
      v-for="(value, index) in localValues"
      :key="`event-select-${index}`"
      :class="$style.value"
    >
      <el-select
        v-model="localValues[index]"
        :placeholder="placeholder"
        clearable
      >
        <el-option
          v-for="item in availableItems"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <i
        v-if="index > 0"
        class="el-icon-close"
        :class="$style.removeButton"
        @click="removeItem(index)"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
}

.newButton {
  position: absolute;
  right: 0;
  bottom: 100%;
  padding-bottom: 0.4rem;
  transition: none;
}

.value {
  display: flex;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: rem(16px);
  }
}

.removeButton {
  display: flex;
  align-items: center;
  margin-left: rem(16px);
  font-size: rem(26px);
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
}
</style>
