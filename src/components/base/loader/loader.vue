<script>

export default {
  name: 'BaseLoader',
  props: {
    size: {
      type: String,
      default: '',
      validator: v => !v || /small|large/.test(v),
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div
    :class="{
      'base-loader': true,
      'base-loader--fullscreen': fullscreen,
      'base-loader--transparent': transparent,
    }"
    data-cy="init-loader"
  >
    <div
      ref="loader"
      :class="['base-loader__spin', size && 'base-loader__spin--' + size]"
    />
    <slot />
  </div>
</template>

<style lang="scss" src="./loader.scss" />
