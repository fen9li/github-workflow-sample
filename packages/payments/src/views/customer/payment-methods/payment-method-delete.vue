<script>

export default {
  name: 'CustomerPaymentDeleteModal',
  inheritAttrs: false,
  props: {
    method: {
      type: Object,
      default: () => ({}),
    },
    customer: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      processing: false,
    }
  },
  computed: {
    title() {
      return this.method.type === 'account' ?
        'Delete Bank Account' :
        'Delete Credit/Debit Card'
    },
  },
  methods: {
    async onSubmit() {
      this.processing = true
      const { method, customer } = this
      const [error,] = await this.$api.delete(`/customers/${customer.id}/tokens/${method.token}`)

      this.processing = false

      if (error) {
        const violations = Object.keys(error.violations)
        violations.forEach(violation => {
          setTimeout(() => {
            this.$notify({
              type: 'error',
              title: 'Error',
              message: `${violation}: ${error.violations[violation][0]}`,
            })
          }, 50)
        })
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Method removed successfully`,
        })
      }
      this.$emit('close')
      this.$emit('updated')
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
    <p :class="$style.desc">
      There may be payments scheduled using this card's details.
    </p>
    <el-button
      type="danger"
      :class="[
        $style.submit,
        'wide-button',
      ]"
      data-test="submit"
      :loading="processing"
      @click="onSubmit"
    >
      Delete
    </el-button>
  </state-dialog>
</template>

<style lang="scss" module>
.desc {
  word-break: normal !important;
}
.root {
  margin-left: .5rem;
}

.submit {
  margin-top: 1rem;
}
</style>
