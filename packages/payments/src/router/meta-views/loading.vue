<script>
export default {
  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }],
  },
}
</script>

<template>
  <div :class="$style.loading">
    <transition appear>
      <i :class="[$style.loadingIcon, 'el-icon-loading']" />
    </transition>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.loading {
  width: 100%;
  margin: 40px auto;
  text-align: center;
}

.loadingIcon {
  margin: 0 auto;
  font-size: 3rem;

  // stylelint-disable-next-line selector-class-pattern
  &:global(.v-enter-active) {
    transition: opacity 1s;
  }
  // stylelint-disable-next-line selector-class-pattern
  &:global(.v-enter) {
    opacity: 0;
  }
}
</style>
