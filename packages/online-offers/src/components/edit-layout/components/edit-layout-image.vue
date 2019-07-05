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
      required: true,
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
  <uploadcare
    :public-key="uploadcare.publicKey"
    :secure-signature="uploadcareSignature"
    :secure-expire="uploadcare.expire"
    crop="200x200"
    :class="$style.uploader"
    :value="value"
    @success="onSuccessUploading"
  >
    <el-button
      plain
    >
      Upload
    </el-button>
    <div
      :class="[
        $style.uploaderTip,
        !value && $style.uploaderTipPlaceholder,
      ]"
    >
      {{ value || 'Select file' }}
    </div>
  </uploadcare>
</template>

<style lang="scss" module>
.uploader {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  padding-bottom: .5rem;
}

.uploaderTip {
  width: 100%;
  height: 2.5rem;
  padding: 0 1rem;
  margin-right: -2px;
  border: solid 1px #DCDFE6;
  border-right: none;
  border-radius: .25rem 0 0 .25rem;
}

.uploaderTipPlaceholder {
  color: #c0c4cb;
}
</style>
