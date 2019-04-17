<script>
import StateDialog from '@components/state-dialog'

export default {
  name: 'CustomerPaymentDeleteModal',
  components: {
    StateDialog,
  },
  inheritAttrs: false,
  props: {
    method: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    title() {
      return this.method.type === 'account' ?
        'Delete Bank Account' :
        'Delete Credit/Debit Card'
    },
  },
  methods: {
    submit() {
      this.$emit('close')
    },
  },
}
</script>

<template>
  <state-dialog
    v-bind="$attrs"
    :title="title"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="tickets"
    />
    <el-button
      slot="subicon"
      icon="el-icon-delete"
      type="danger"
      circle
    />
    <p>
      There may be payments scheduled using this card details.
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
