<script>
import BuilderElement from './builder-element.mixin'
import RichTextarea from '@lib/components/rich-textarea'

export default {
  name: 'BuilderTextarea',
  components: {
    RichTextarea,
  },
  mixins: [BuilderElement],
}
</script>

<template>
  <div class="builder-textarea form-element">
    <div class="block-label">
      {{ label }}
    </div>
    <rich-textarea
      :value="value"
      :limit="limit"
      @input="onInput"
    />
  </div>
</template>
