<script>
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'

export default {
  name: 'EditLayoutImage',
  components: {
    uploadcare,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uploadcare: {
        expire: new Date(new Date + 60 * 60 * 12).getTime(),
        publicKey: process.env.VUE_APP_UPLOADCARE_PUBLIC_KEY,
        secretKey: process.env.VUE_APP_UPLOADCARE_SECRET_KEY,
      },
    }
  },
  computed: {
    uploadcareSignature() {
      return md5(this.uploadcare.secretKey + this.uploadcare.expire)
    },
  },
  methods: {
    onSuccessUploading(img) {
      this.$emit('imageLoaded', img.cdnUrl)
    },
  },
}
</script>
<template>
  <div :class="$style.container">
    <img
      :src="value"
      :alt="value"
      :class="$style.preview"
    >
    <uploadcare
      :public-key="uploadcare.publicKey"
      :secure-signature="uploadcareSignature"
      :secure-expire="uploadcare.expire"
      crop="200x200"
      :class="[
        $style.uploader,
        disabled && $style.uploaderDisabled,
      ]"
      :value="value"
      @success="onSuccessUploading"
    >
      <el-button
        plain
        :disabled="disabled"
      >
        Upload
      </el-button>
      <div
        :class="[
          $style.uploaderTip,
          !value && $style.uploaderTipPlaceholder,
          disabled && $style.uploaderTipDisabled,
        ]"
      >
        {{ value || 'Select file' }}
      </div>
    </uploadcare>
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
}

.preview {
  max-width: rem(100px);
  margin-bottom: rem(10px);
}

.uploader {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  padding-bottom: .5rem;
}

.uploaderDisabled {
  pointer-events: none;
}

.uploaderTip {
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  margin-right: -2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border: solid 1px #DCDFE6;
  border-right: none;
  border-radius: .25rem 0 0 .25rem;
}

.uploaderTipPlaceholder {
  color: #c0c4cb;
}

.uploaderTipDisabled {
  color: #c0c4cb;
  cursor: not-allowed;
  background-color: #F5F7FA;
  border-color: #E4E7ED;
}
</style>
