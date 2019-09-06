<script>
export default {

}
</script>

<template>
  <dl :class="['datalist', $style.list]">
    <slot />
  </dl>
</template>

<style lang="scss" module>
.list {
  flex: 1 0 50%;
  margin-top: 0;

  dt {
    color: black;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}
</style>
