<script>
export default {
  name: 'PreviewModal',
  props: {
    title: {
      type: String,
      required: true,
    },
    fullBody: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <el-dialog
    :title="title"
    :class="[$style.dialog, {[$style.fullBody] : fullBody}]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
    <div
      v-if="$slots.footer"
      slot="footer"
    >
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<style lang="scss" module>
.dialog {
  :global {
    .el-dialog {
      width: 100%;
      max-width: rem(360px) !important;
      overflow: hidden;
      line-height: 1.2rem;
    }

    .el-dialog__title {
      font-size: rem(18px);
      font-weight: 600;
    }

    .el-dialog__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: rem(30px) rem(40px);
      text-align: left;
    }

    .el-dialog__headerbtn {
      position: relative;
      top: 0;
      right: 0;
      margin-left: rem(30px);

      .el-dialog__close {
        font-size: rem(20px);
      }
    }

    .el-dialog__body {
      padding: 0 rem(40px) rem(25px);
      font-size: rem(14px);
      color: #303133;
      word-break: break-word;
    }

    .el-dialog__footer {
      display: flex;
      justify-content: center;
      padding: 0 rem(40px) rem(30px);
    }
  }
}

.fullBody {
  :global {
    .el-dialog__body {
      padding: 0;
    }
  }
}
</style>
