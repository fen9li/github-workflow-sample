<script>
import StateDialog from '@components/state-dialog/state-dialog'

export default {
  name: 'SubscriptionSetEndDateModal',
  components: {
    StateDialog,
  },
  props: {
    subscription: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    submit() {
      this.dialogVisible = false
    },
  },
}
</script>

<template>
  <div :class="$style.root">
    <el-button
      type="danger"
      icon="el-icon-delete"
      size="small"
      circle
      @click="dialogVisible = true"
    />

    <state-dialog
      :visible.sync="dialogVisible"
      title="Delete Subscription"
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
        Deleting a Subscription will set the Subscription
        End Date to tomorrow.
      </p>
      <p>
        The Subscription will then end and any outstanding
        Subscription Balance will be calculated and refundable/payable.
      </p>
      <el-button
        :class="[
          $style.submit,
          'wide-button',
        ]"
        type="danger"
        @click="submit"
      >
        Delete
      </el-button>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>

.root {
  margin-left: .5rem;
}

.submit {
  margin-top: 1rem;
}
</style>
