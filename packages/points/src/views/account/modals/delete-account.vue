<script>
export default {
  name: 'DeleteAccount',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      progress: false,
    }
  },
  methods: {
    async onSubmit() {
      this.progress = true
      this.$emit('close-modal')
      this.progress = false
    },
  },
}
</script>

<template>
  <state-dialog
    title="Delete Account"
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
      Are you sure you wish to delete this account?
    </div>
    <div class="modal__footer">
      <el-button
        type="danger"
        :loading="progress"
        class="el-button--wide"
        @click.stop="onSubmit"
      >
        Delete
      </el-button>
    </div>
  </state-dialog>
</template>

<style lang="scss" module>
.msg {
  word-break: normal;
}
</style>
