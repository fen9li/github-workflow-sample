<script>
import md5 from 'md5'
import uploadcare from 'uploadcare-vue'

export default {
  name: 'MerchantEditImage',
  components: {
    uploadcare,
  },
  props: {
    currentItem: {
      type: Boolean,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: this.image.selected,
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
  watch: {
    'image.selected'(newVal) {
      this.selected = newVal
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
  <div :class="$style.wrapper">
    <uploadcare
      v-if="currentItem && !image.value"
      :public-key="uploadcare.publicKey"
      :secure-signature="uploadcareSignature"
      :secure-expire="uploadcare.expire"
      crop="200x200"
      :class="$style.uploader"
      @success="onSuccessUploading"
    >
      <el-button
        type="primary"
        plain
      >
        Select File
      </el-button>
      <div
        :class="$style.uploaderTip"
      >
        Click or drop to upload
      </div>
    </uploadcare>
    <div
      v-else
      :class="$style.logoControl"
    >
      <el-checkbox
        v-if="!currentItem"
        v-model="selected"
        @input="$emit('changeValue', selected)"
      />
      <div :class="$style.imageWrapper">
        <img
          :src="image.value"
          alt="Merchant Logo"
          :class="$style.image"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  width: 100%;
}

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
  color: #c0c4cb;
  border: solid 1px #DCDFE6;
  border-right: none;
  border-radius: .25rem 0 0 .25rem;
}

.logoControl {
  display: flex;
  align-items: center;
}

.imageWrapper{
  width: 3rem;
  height: 3rem;
}
.image {
  width: 100%;
  height: auto;
}
</style>
