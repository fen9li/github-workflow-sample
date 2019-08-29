<script>

export default {
  name: 'CellToggle',
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    switchValue() {
      return this.enabled
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    },
  },
}
</script>

<template>
  <div @click.stop="onClick">
    <el-switch
      :value="switchValue"
      :disabled="disabled"
    />
  </div>
</template>
