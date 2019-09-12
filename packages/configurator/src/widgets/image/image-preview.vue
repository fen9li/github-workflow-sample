<script>
import get from 'lodash/get'
import PreviewMixin from '../preview.mixin'

export default {
  name: 'ImagePreview',
  mixins: [PreviewMixin],
  computed: {
    mobileImg() {
      return get(this.config.props, 'image.mobile')
    },
    desktopImg() {
      return get(this.config.props, 'image.desktop')
    }
  }
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.previews">
      <div :class="$style.imgWrap">
        <span>Desktop</span>
        <img
          v-if="desktopImg"
          :class="$style.img"
          :src="desktopImg"
          alt="Mobile"
        >
      </div>
      <div :class="$style.imgWrap">
        <span>Mobile</span>
        <img
          v-if="mobileImg"
          :class="$style.img"
          :src="mobileImg"
          alt="Mobile"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.previews {
  display: flex;
  justify-content: space-between;
}

.imgWrap {
  width: 45%;
}

.img {
  width: 100%;
  margin-top: .5rem;
  object-fit: contain;
}
</style>
