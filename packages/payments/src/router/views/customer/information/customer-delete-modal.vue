<script>
import StateDialog from '@components/state-dialog'

export default {
  name: 'CustomerEditModal',
  components: {
    StateDialog,
  },
  inheritAttrs: false,
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    submit() {

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
      @click="submit"
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
