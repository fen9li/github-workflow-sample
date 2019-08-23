<script>
import get from 'lodash/get'

export default {
  name: 'SelectFilter',
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
  computed: {
    values() {
      return get(this.filter, 'values', [])
    },
  },
  created() {
    if (!this.model.value) {
      this.model.value = []
    }
  },
}
</script>

<template>
  <el-checkbox-group
    v-model="model.value"
    :class="$style.select"
  >
    <el-checkbox
      v-for="{ label, value } in values"
      :key="label"
      :label="value"
    >
      {{ label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<style lang="scss" module>
.select {
  display: flex;
  flex-direction: column;
}
</style>
