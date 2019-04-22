<template>
  <div :class="$style.root">
    <div>
      <div :class="$style.number">
        403
      </div>
      <div :class="$style.forbidden">
        Forbidden
      </div>
      <router-link
        :to="{path: '/'}"
      >
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForbidden',
}
</script>

<style lang="scss" module>
  .root {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 40px;
    line-height: 1.6;
    text-align: center;
  }

  .number {
    font-size: 5rem;
    font-weight: bold;
  }

  .forbidden {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
