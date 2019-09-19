<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    options() {
      return {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
          ]
        }
      }
    }
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.html)
    }
  },
}
</script>

<template>
  <div :class="$style['main']">
    <quill-editor
      :content="value"
      :options="options"
      @change="onChange($event)"
    />
  </div>
</template>

<style lang="scss" module>
  .main {
    line-height: 12px;
  }
</style>
