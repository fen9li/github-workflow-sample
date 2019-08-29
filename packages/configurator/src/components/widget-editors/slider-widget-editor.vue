<script>
import WidgetEditorMixin from './widget-editor.mixin'

export default {
  name: 'SliderWidgetEditor',
  mixins: [WidgetEditorMixin],
  data() {
    return {
      configObj: {
        slides: [],
      },
    }
  },
  methods: {
    getSlideObj() {
      return {
        title: '',
        image: {
          mobile: '',
          desktop: '',
          alt: '',
        },
        cta: {
          path: '',
        },
      }
    },
    addNewSlide() {
      this.configObj.slides.push(this.getSlideObj())
    },
    removeSlide(index) {
      const { configObj } = this
      const { slides } = configObj
      const partBefore = slides.slice(0, index)
      const partAfter = slides.slice(index + 1)

      configObj.slides = partBefore.concat(partAfter)
    },
  },
}
</script>

<template>
  <form-wrap :form="configObj">
    {{ configObj }}
    <div
      class="form-item"
      v-for="(slide, index) in configObj.slides"
      :key="index"
    >
      <h2>
        Slide #{{ index + 1 }}
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="removeSlide(index)"
        />
      </h2>

      <div class="form-title">Title</div>
      <rich-textarea v-model="slide.title" />

      <div class="form-title">Image</div>
      <image-editor v-model="slide.image" />

      <div class="form-title">CTA</div>
      <cta-editor v-model="slide.cta" />
    </div>

    <el-button @click="addNewSlide" type="primary">Add a new slide</el-button>
  </form-wrap>
</template>
