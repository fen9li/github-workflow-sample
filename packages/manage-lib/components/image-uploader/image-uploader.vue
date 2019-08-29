<script>
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'

export default {
  name: 'ImageUploader',
  components: {
    uploadcare,
  },
  props: {
    crop: {
      type: String,
      default: '160x60',
    },
    image: {
      type: [Boolean, String],
      default: false,
    },
    theme: {
      type: String,
      default: 'input',
    }
  },
  data() {
    return {
      uploadcare: {
        expire: new Date(new Date + 60 * 60 * 12).getTime(),
        publicKey: process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY,
        secretKey: process.env.VUE_APP_UPLOADCARE_SECRET_KEY,
      },
      preview: null,
    }
  },
  computed: {
    uploadcareSignature() {
      const { uploadcare: { secretKey, expire } } = this
      return md5(secretKey + expire)
    },
  },
  created() {
    const { image } = this
    if (typeof image === 'string' && image.length) {
      this.preview = image
    }
  },
  methods: {
    onSuccessUpload(image) {
      this.preview = image.cdnUrl
      this.$emit('onUpload', image)
    },
  },
}
</script>

<template>
  <uploadcare
    :public-key="uploadcare.publicKey"
    :secure-signature="uploadcareSignature"
    :secure-expire="uploadcare.expire"
    :crop="crop"
    :class="[
      [$style.uploader],
      [$style[`uploader--${theme}`]]
    ]"
    @success="onSuccessUpload"
  >
    <img
      v-if="preview"
      :class="$style.uploaderPreview"
      :src="preview"
      :alt="preview"
      :title="preview"
    >
    <span
      v-else
      :class="$style.uploaderTip"
    >
      {{ crop }}
    </span>
    <el-button
      type="primary"
      plain
      :class="$style.uploaderButton"
    >
      <slot name="button-text">
        Select file
      </slot>
    </el-button>
  </uploadcare>
</template>

<style lang="scss" module>
  .uploader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0;

    &--input {
      padding-left: rem(15px);
      border: rem(1px) solid #dcdfe6;
      border-radius: rem(4px);
    }
  }

  .uploaderPreview {
    max-width: rem(160px);
    min-height: rem(60px);
    max-height: rem(60px);
    margin: rem(15px 0);
  }

  .uploaderButton {
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    min-height: 100%;
    border-radius: rem(0 4px 4px 0);
  }

  .uploaderTip {
    color: #c0c4cc
  }
</style>
