<script>
export default {
  name: 'RichTextareaGuide',
  guide: {
    name: 'RichTextarea',
    category: 'input',
  },
  data() {
    return {
      model:
        'Lorem ipsum dolor sit <i>amet</i>, consectetur adipisicing elit.<br> At, rem?',
    }
  },
}
</script>

<template>
  <div>
    <h3>Basic usage</h3>
    <rich-textarea v-model="model" />
    <br>
    <rich-renderer :html="model" />
  </div>
</template>
