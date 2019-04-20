
<script>
export default {
  name: 'StateDialog',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
}
</script>

<template>
  <el-dialog
    :class="$style.root"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div :class="$style.iconWrapper">
      <div :class="$style.icon">
        <slot name="icon" />
      </div>
      <div :class="$style.subicon">
        <slot name="subicon" />
      </div>
    </div>

    <h4 :class="$style.title">
      {{ title }}
    </h4>
    <slot />
  </el-dialog>
</template>

<style lang="scss" module>
@import '@design';

.root {
  text-align: center;

  :global {

    .el-dialog {
      width: 22rem;
    }

    .el-dialog__title {
      display: none;
    }

    .el-dialog__header {
      padding: 0;
    }

    .el-dialog__body {
      padding: 2rem 3rem;
    }
  }
}

.icon {
  font-size: 2.5rem;
  opacity: .5;
}

.subicon {
  position: absolute;
  right: -0.5rem;
  bottom: -0.1rem;

  :global(.el-button) {
    padding: .4rem;
  }
}

.iconWrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.5rem;
  height: 5.5rem;
  margin: 1rem auto;
  border: .15rem dashed var(--color-primary);
  border-radius: 50%;
}

.title {
  margin: 1rem 0;
  font-size: 1.2rem;
}
</style>
