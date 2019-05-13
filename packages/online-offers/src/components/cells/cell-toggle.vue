<script>
export default {
  name: 'CellToggle',
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  computed: {
    status() {
      // temporary, until more data is available for more options
      return this.row.status === 'active' ? true : false
    },
  },
}
</script>

<template>
  <el-switch
    :value="status"
  />
</template>
