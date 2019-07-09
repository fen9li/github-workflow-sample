<script>

export default {
  name: 'BaseLoader',
  props: {
    size: {
      type: String,
      default: '',
      validator: v => !v || /small|large/.test(v),
    },
    theme: {
      type: String,
      default: '',
      validator: v => !v || /state/.test(v),
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div
    :class="[
      'base-loader--' + theme,
      {
        'base-loader': true,
        'base-loader--fullscreen': fullscreen,
        'base-loader--transparent': transparent,
        'base-loader--center': center,
      }
    ]"
    data-cy="init-loader"
  >
    <div
      ref="loader"
      :class="[
        'base-loader__spin',
        size && 'base-loader__spin--' + size,
      ]"
    />
    <slot />
  </div>
</template>

<style lang="scss" src="./loader.scss" />
