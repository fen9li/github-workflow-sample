<script>
export default {
  name: 'UserAccessResend',
  inheritAttrs: false,
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
    }
  },
  methods: {
    onClick() {
      // this.loading = true
      // some api request here
      // this.loading = false

      this.dialogVisible = true
    },
  },
}
</script>

<template>
  <div>
    <el-button
      type="primary"
      size="small"
      :loading="loading"
      @click="onClick"
    >
      Resend Registration Link
    </el-button>
    <state-dialog :visible.sync="dialogVisible">
      <el-icon
        slot="icon"
        name="message"
      />
      <el-icon
        slot="subicon"
        :class="$style.subicon"
        name="success"
      />
      <div :class="$style.msg">
        Registration Link<br> successfully resent!
      </div>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>


  .msg {
    margin-top: 2rem;
    font-size: 22px;
    line-height: 30px;
    text-align: center;
  }

  .subicon {
    font-size: 24px;
    color: var(--color-success);
  }
</style>
