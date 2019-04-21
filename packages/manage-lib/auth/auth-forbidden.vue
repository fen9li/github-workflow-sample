<template>
  <div :class="$style.root">
    No access
  </div>
</template>

<script>
export default {
  name: 'AuthForbidden',
}
</script>

<style lang="scss" module>

.root {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 40px;
  font-weight: 300;
}
</style>
