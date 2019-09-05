<script>
export default {
  name: 'PreviewOfModal',
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
  <div
    :class="[$style.dialog, {[$style.fullBody] : fullBody}]"
  >
    <div :class="$style.header">
      <div :class="$style.title">
        {{ title }}
      </div>
      <div :class="$style.headerBtn">
        <i :class="['el-icon-close', $style.closeBtn]" />
      </div>
    </div>
    <div :class="$style.body">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      slot="footer"
      :class="$style.footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" module>
  .dialog {
    width: 100%;
    max-width: rem(360px) !important;
    overflow: hidden;
    line-height: 1.2rem;
    pointer-events: none;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: scale(0.8);
    transform-origin: left top;
  }

  .title {
    font-size: rem(18px);
    font-weight: 600;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: rem(30px) rem(40px);
    text-align: left;
  }

  .headerBtn {
    position: relative;
    top: 0;
    right: 0;
    margin-left: rem(30px);
  }

  .closeBtn {
    font-size: rem(20px);
  }

  .body {
    padding: 0 rem(40px) rem(25px);
    font-size: rem(14px);
    color: #303133;
    word-break: break-word;
  }

  .footer {
    display: flex;
    justify-content: center;
    padding: 0 rem(40px) rem(30px);
  }

  .fullBody {
    .body {
      padding: 0;
    }
  }
</style>
