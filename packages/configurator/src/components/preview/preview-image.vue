<script>
import PreviewMixin from '~/widgets/preview.mixin'

export default {
  name: 'PreviewImage',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div
    v-if="desktop || mobile"
    :class="$style.root"
  >
    <div
      v-if="desktop"
      :class="$style.wrapper"
    >
      <span :class="$style.tip">
        Desktop
      </span>
      <img
        :class="$style.image"
        :src="desktop"
        :alt="alt"
      >
    </div>
    <div
      v-if="mobile"
      :class="$style.wrapper"
    >
      <span :class="$style.tip">
        Mobile
      </span>
      <img
        :class="$style.image"
        :src="mobile"
        :alt="alt"
      >
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-wrap: nowrap;

  + * {
    margin-top: rem(14px);
  }
}

.wrapper {
  position: relative;
  display: flex;
  flex-basis: 50%;
  align-items: center;
  justify-content: center;
  height: rem(64px);
  margin-top: rem(16px);
  border: 1px solid var(--color-divider);
  border-radius: rem(4px);
}

.wrapper + .wrapper {
  margin-left: rem(12px);
}

.tip {
  position: absolute;
  top: rem(-16px);
  left: 0;
  font-size: rem(12px);
}

.image {
  max-width: 100%;
  min-height: 0;
  max-height: 100%;
  margin: 0;
}
</style>
