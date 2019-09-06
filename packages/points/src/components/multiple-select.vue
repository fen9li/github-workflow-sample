<script>
export default {
  name: 'MultipleSelect',
  props: {
    values: {
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
}
</script>

<template>
  <div :class="$style.container">
    <el-button
      type="text"
      :class="$style.newButton"
      @click="$emit('add')"
    >
      <i class="el-icon-plus" />
      Add Event
    </el-button>
    <div
      v-for="(value, index) in values"
      :key="`event-select-${ index }`"
      :class="$style.value"
    >
      <el-select
        v-model="values[index]"
        :placeholder="placeholder"
      >
        <el-option
          v-for="item in items"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <i
        v-if="index > 0"
        class="el-icon-close"
        :class="$style.removeButton"
        @click="$emit('remove', index)"
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
