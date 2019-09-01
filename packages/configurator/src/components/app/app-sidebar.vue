<script>
export default {
  name: 'AppSidebar',
}
</script>

<template>
  <aside :class="$style.root">
    <div :class="$style.header">
      <img src="//loyaltycorp.com.au/wp-content/uploads/logo-lc.svg">
    </div>
    <div :class="$style.body">
      <slot />
    </div>
  </aside>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
  width: rem(300px);
  height: 100vh;
  border-right: 1px solid var(--color-divider);
}

.header {
  flex-shrink: 0;
  height: rem(64px);
  padding: rem(14px 40px);
  border-bottom: 1px solid var(--color-divider);

  img {
    height: 100%;
    margin: auto;
  }
}

.body {
  flex-grow: 1;
  padding: rem(24px 0);
  overflow-y: auto;
}
</style>
