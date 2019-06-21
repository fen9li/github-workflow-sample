<script>

export default {
  name: 'CellToggle',
  props: {
    enabled: {
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
      this.$emit('click')
    },
  },
}
</script>

<template>
  <div @click.stop="onClick">
    <el-switch
      :value="switchValue"
    />
  </div>
</template>
