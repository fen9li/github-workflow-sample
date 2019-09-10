<script>
import ImageUploader from '@lib/components/image-uploader'
import BuilderElement from './builder-element.mixin'

export default {
  name: 'BuilderImage',
  components: {
    ImageUploader,
  },
  mixins: [BuilderElement],
  props: {
    ratio: {
      type: Object,
      default: () => ({})
    },
  },
  data: () => ({
    form: {
      mobile: '',
      desktop: '',
      alt: '',
    },
  }),
  methods: {
    onUploaded({ cdnUrl }, key) {
      this.form[key] = cdnUrl
    },
  },
}
</script>

<template>
  <div class="form-element">
    <div class="block-label">
      {{ label }}
    </div>
    <div :class="$style.body">
      <div :class="$style.media">
        <image-uploader
          :class="$style.uploader"
          :image="form.desktop"
          placeholder="Desktop"
          :crop="ratio.desktop || 'disabled'"
          @onUpload="onUploaded($event, 'desktop')"
        />
        <image-uploader
          :class="$style.uploader"
          :image="form.mobile"
          :crop="ratio.mobile || 'disabled'"
          placeholder="Mobile"
          @onUpload="onUploaded($event, 'mobile')"
        />
      </div>
      <div class="input-label">
        Alternative text
      </div>
      <el-input v-model="form.alt" />
    </div>
  </div>
</template>

<style lang="scss" module>

.media {
  display: flex;
}

.uploader {
  display: flex;
  flex-basis: 50%;
  justify-content: center;
  height: rem(100px);
  padding: 0;
  text-align: center;
  cursor: pointer;
  border: 1px dashed var(--color-divider);

  &:after {
    // content: 'Desktop'
  }

  &:hover {
    border-color: var(--color-primary);
  }

  :global {
    .el-button {
      display: none;
    }

    .image-uploader__tip {
      color: var(--color-text-light);
    }

    img {
      max-width: 100%;
      min-height: 0;
      max-height: 100%;
      margin: 0;
    }
  }

  + .uploader {
    margin-left: rem(10px);
  }
}
</style>
