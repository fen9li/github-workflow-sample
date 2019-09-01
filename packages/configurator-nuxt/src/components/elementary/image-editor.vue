<script>
import ElementaryEditorMixin from './elementary-editor.mixin'
export default {
  name: 'ImageEditor',
  mixins: [ElementaryEditorMixin],
  methods: {
    onImgUploaded({ cdnUrl }, key) {
      this.form[key] = cdnUrl
    },
  },
}
</script>

<template>
  <div>
    <div class="form-title form-title--small">Desktop</div>
    <image-uploader @onUpload="onImgUploaded($event, 'desktop')" />
    <div class="form-title form-title--small">Mobile</div>
    <image-uploader @onUpload="onImgUploaded($event, 'mobile')" />
    <div class="form-title form-title--small">Alternative text</div>
    <el-input v-model="form.alt" />
  </div>
</template>
