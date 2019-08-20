<script>
export default {
  name: 'DateStatusFilter',
  props: {
    model: {
      type: Object,
      required: true,
    },
    filter: {
      type: Object,
      default: null,
    },
  },
  created() {
    if (!this.model.value) {
      this.model.value = ''
    }
  },
}
</script>

<template>
  <el-radio-group
    v-model="model.value"
    :class="$style.radios"
  >
    <el-radio label="active">
      Active
    </el-radio>
    <el-radio label="inactive">
      Inactive
    </el-radio>
  </el-radio-group>
</template>

<style lang="scss" module>
.radios {
  display: flex;
  flex-direction: column;
}
</style>
