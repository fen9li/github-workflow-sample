<script>
import ElementaryEditorMixin from './elementary-editor.mixin'

export default {
  name: 'CtaEditor',
  mixins: [ElementaryEditorMixin],
}
</script>

<template>
  <div>
    <div class="form-title form-title--small">Label</div>
    <el-input v-model="form.label" />
    <div class="form-title form-title--small">Path</div>
    <el-input v-model="form.path" />
  </div>
</template>
