<script>
export default {
  name: 'CellRoute',
  props: {
    row: {
      type: Object,
      required: true,
    },
    pathName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    identifier: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    goTo() {
      const { pathName, row, identifier } = this

      this.$router.push({
        name: pathName,
        params: { id: row[identifier] },
      })
    },
  },
}
</script>

<template>
  <el-button
    type="text"
    :class="$style.text"
    @click="goTo"
  >
    {{ text }}
  </el-button>
</template>

<style lang="scss" module>
.text {
  font-weight: 700
}
</style>
