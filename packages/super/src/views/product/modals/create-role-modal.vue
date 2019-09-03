<script>
export default {
  name: 'CreateRoleModal',
  data() {
    return {
      progress: false,
      form: {},
    }
  },
  methods: {},
}
</script>

<template>
  <el-dialog
    title="Create Role"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      No design yet
    </el-form>
  </el-dialog>
</template>

<style lang="scss" module>
.button {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

:global {
  .el-input__count-inner {
    line-height: 1;
  }
}
</style>
