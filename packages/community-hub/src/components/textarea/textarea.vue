<script>
export default {
  name: 'TheTextarea',
  props: {
    value: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 4,
    },
    maxChars: {
      type: Number,
      default: 255,
    },
  },
  computed:{
    internalValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
}
</script>

<template>
  <div :class="$style.container">
    <el-input
      v-model="internalValue"
      type="textarea"
      :rows="rows"
      :maxlength="maxChars"
    />
    <div
      v-if="maxChars"
      :class="$style.chars"
    >
      {{ internalValue.length }} / {{ maxChars }}
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  position: relative;
}

.chars {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: rem(4px);
  font-size: rem(12px);
  line-height: 1;
}
</style>
