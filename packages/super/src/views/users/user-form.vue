<script>
export default {
  name: 'UserForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <main-layout
    :title="isEdit ? 'Edit User' : 'Create User'"
    back
  >
    <el-card>
      Form
    </el-card>
  </main-layout>
</template>
