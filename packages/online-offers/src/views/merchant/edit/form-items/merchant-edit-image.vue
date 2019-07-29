<script>
export default {
  name: 'MerchantEditImage',
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
  methods: {
    onSuccessUploading(img) {
      this.$emit('imageLoaded', img.cdnUrl)
    },
  },
}
</script>
<template>
  <image-uploader
    :image="image"
    theme="input"
    @onUpload="onSuccessUploading"
  />
</template>
