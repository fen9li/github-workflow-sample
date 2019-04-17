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
      form: {
        endDate: '',
      },
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
      type="primary"
      :class="$style.trigger"
      size="small"
      plain
      @click="dialogVisible = true"
    >
      Set End Date
    </el-button>

    <state-dialog
      title="Edit Subscription"
      :visible.sync="dialogVisible"
    >
      <el-icon
        slot="icon"
        name="date"
      />
      <p>
        When the Subscription reaches it's End Date,
        any outstanding Subscription Balance
        will be calculates and refundable/payable.
      </p>
      <el-date-picker
        v-model="form.endDate"
        :class="$style.date"
        type="date"
        placeholder="DD/MM/YY"
        format="dd/MM/yy"
        value-format="dd/MM/yy"
      />
      <el-button
        type="primary"
        class="wide-button"
        :disabled="!form.endDate"
        @click="submit"
      >
        Set Date
      </el-button>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>

.root {
  margin-left: .5rem;
}

.date {
  margin: 1rem 0 2rem;
}

</style>
