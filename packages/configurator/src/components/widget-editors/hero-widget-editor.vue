<script>
import WidgetEditorMixin from './widget-editor.mixin'

export default {
  name: 'HeroWidgetEditor',
  mixins: [WidgetEditorMixin],
  data() {
    return {
      configObj: {
        text: '',
        image: {
          desktop: '',
          mobile: '',
          alt: '',
        },
        gradient: '',
        cta: {
          label: '',
          path: '',
        },
      },
    }
  },
}
</script>

<template>
  <form-wrap :form="configObj">
    <div class="form-item">
      <div class="form-title">Text</div>
      <rich-textarea v-model="configObj.text" />
    </div>

    <div class="form-item">
      <div class="form-title">Image</div>
      <image-editor v-model="configObj.image" />
    </div>

    <div class="form-item">
      <div class="form-title">Gradient</div>
      <el-input v-model="configObj.gradient" />
    </div>

    <div class="form-item">
      <div class="form-title">CTA</div>
      <cta-editor v-model="configObj.cta" />
    </div>
  </form-wrap>
</template>
