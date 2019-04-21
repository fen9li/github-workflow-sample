<script>
export default {
  name: 'CustomerEditModal',
  inheritAttrs: false,
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onSubmit() {
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Customer successfully deleted.',
      })
      this.$emit('update:visible', false)
    },
  },
}
</script>

<template>
  <state-dialog
    v-bind="$attrs"
    title="Delete Customer"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="news"
    />
    <el-button
      slot="subicon"
      icon="el-icon-delete"
      type="danger"
      circle
    />
    <p>
      Are you sure you want to delete this customer?
    </p>
    <el-button
      type="danger"
      :class="[
        $style.submit,
        'wide-button',
      ]"
      @click="onSubmit"
    >
      Delete
    </el-button>
  </state-dialog>
</template>

<style lang="scss" module>

.root {
  margin-left: .5rem;
}

.submit {
  margin-top: 1rem;
}
</style>
