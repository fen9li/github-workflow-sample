<script>
import { mapActions } from 'vuex'

export default {
  name: 'DeleteLimitModal',
  props: {
    limit: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      progress: false,
    }
  },
  methods: {
    ...mapActions('limit', ['deleteLimit']),
    async onSubmit() {
      this.progress = true

      await this.deleteLimit(this.limit.id)

      this.$emit('close-modal')
      this.$emit('done')
      this.progress = false
    },
  },
}
</script>

<template>
  <state-dialog
    title="Delete Limit"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="warning"
    />
    <el-icon
      slot="subicon"
      name="delete"
    />
    <div :class="$style.msg">
      Are you sure you wish to delete this limit?
    </div>
    <div class="modal__footer">
      <el-button
        type="danger"
        :loading="progress"
        class="el-button--wide"
        @click.stop="onSubmit"
      >
        Delete Limit
      </el-button>
    </div>
  </state-dialog>
</template>

<style lang="scss" module>
.msg {
  word-break: normal;
}
</style>
