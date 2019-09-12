<script>
import PreviewMixin from '../preview.mixin'

export default {
  name: 'ImagePreview',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.previews">
      <div :class="$style.imgWrap">
        <span>Desktop</span>
        <img
          :class="$style.img"
          :src="config.props.desktop"
          alt="Mobile"
        >
      </div>
      <div :class="$style.imgWrap">
        <span>Mobile</span>
        <img
          :class="$style.img"
          :src="config.props.mobile"
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
