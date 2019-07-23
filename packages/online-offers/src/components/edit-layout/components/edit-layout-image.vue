<script>
export default {
  name: 'EditLayoutImage',
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
  methods: {
    onSuccessUploading(img) {
      this.$emit('imageLoaded', img.cdnUrl)
    },
  },
}
</script>
<template>
  <image-uploader
    :image="value"
    theme="input"
    @onUpload="onSuccessUploading"
  />
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
