<script>
import BuilderMixin from '../builder.mixin'

export default {
  name: 'SliderBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
    slides: null,
    orderMap: new WeakMap(),
    lastOrderNum: -1,
    slideToEdit: null,
  }),
  computed: {
    config() {
      return this.form
    },
  },
  created() {
    if (!this.form) {
      const { props } = this.initialConfig

      this.form = props
      this.slides = props.slides
    }

    this.buildOrderMap()
  },
  methods: {
    moveSlideUp(index) {
      const { slides } = this

      if (index > 0) {
        const slide = slides[index]
        const prevSlide = slides[index - 1]

        slides.splice(index - 1, 2, slide, prevSlide)
      }
    },
    moveSlideDown(index) {
      const { slides } = this

      if (index + 1 < slides.length) {
        const slide = slides[index]
        const nextSlide = slides[index + 1]

        slides.splice(index, 2, nextSlide, slide)
      }
    },
    addSlide() {
      const { slides, orderMap } = this
      const newSlide = {}

      slides.push(newSlide)
      orderMap.set(newSlide, `Slide ${++this.lastOrderNum}`)
    },
    removeSlide(index) {
      const { slides } = this

      slides.splice(index, 1)
    },
    buildOrderMap() {
      const { slides, orderMap } = this

      slides.forEach((slide, index) => {
        orderMap.set(slide, `Slide ${index + 1}`)
      })

      this.lastOrderNum = slides.length
    },
  },
}
</script>

<template>
  <div class="hero-builder">
    <template v-if="!slideToEdit">
      <div
        v-if="!slides.length"
        :class="$style.empty"
      >
        There are no slides yet
      </div>

      <base-menu-link
        v-for="(slide, index) in slides"
        v-else
        :key="index"
        :title="orderMap.get(slide)"
        @click.native="slideToEdit = slide"
      >
        <template slot="actions">
          <el-button
            icon="el-icon-arrow-down"
            @click.stop.prevent="moveSlideDown(index)"
          />
          <el-button
            icon="el-icon-arrow-up"
            @click.stop.prevent="moveSlideUp(index)"
          />
          <el-button
            icon="el-icon-delete"
            @click.stop.prevent="removeSlide(index)"
          />
        </template>
        {{ slide.cta ? slide.cta.path : '' }}
      </base-menu-link>

      <div :class="$style.add">
        <el-button
          icon="el-icon-plus"
          round
          @click="addSlide"
        >
          New Slide
        </el-button>
      </div>
    </template>

    <base-layout
      v-else
      :title="orderMap.get(slideToEdit)"
      :back="{}"
      :class="$style.editView"
      @back="slideToEdit = null"
    >
      <builder-textarea
        v-model="slideToEdit.title"
        label="Title"
      />
      <builder-image
        v-model="slideToEdit.image"
        :ratio="{
          mobile: '32:21',
          desktop: '288:95',
        }"
        label="Image"
      />
      <builder-cta
        v-model="slideToEdit.cta"
        label="Link"
      />
    </base-layout>
  </div>
</template>

<style lang="scss" module>
.empty {
  font-size: 1.2rem;
  text-align: center;
}
.add {
  margin-top: 1rem;
  text-align: center;
}
.editView {
  position: absolute !important;
  top: 0;
  left: 0;
  background: white;
}
</style>
