<script>
import BuilderElement from './builder-element.mixin'

export default {
  name: 'BuilderCta',
  mixins: [BuilderElement],
  props: {
    label: {
      type: String,
      default: 'Link',
    },
  },
  data: () => ({
    form: {
      label: '',
      path: '',
    }
  }),
}
</script>

<template>
  <div class="builder-cta form-element">
    <div class="block-label">
      {{ label || 'Link' }}
    </div>
    <template v-if="shown('label')">
      <div class="input-label">
        Label
      </div>
      <el-input
        v-model="form.label"
        :maxlength="limit"
      />
    </template>
    <div class="input-label">
      Path
    </div>
    <el-input v-model="form.path" />
  </div>
</template>
