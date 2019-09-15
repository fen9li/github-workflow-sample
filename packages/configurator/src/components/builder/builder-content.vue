<script>
import BuilderElement from './builder-element.mixin'

export default {
  name: 'BuilderContent',
  mixins: [BuilderElement],
  data: () => ({
    form: {
      title: '',
      text: '',
      size: '',
    }
  }),
}
</script>

<template>
  <div class="builder-content form-element">
    <builder-textarea
      v-if="shown('title')"
      v-model="form.title"
      label="Title"
    />
    <builder-textarea
      v-if="shown('text')"
      v-model="form.text"
      label="Text"
    />
    <builder-radio
      v-if="shown('size')"
      v-model="form.size"
      label="Text size"
      :options="[
        { label: 'Base', value: 'base' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
      ]"
    />
  </div>
</template>
