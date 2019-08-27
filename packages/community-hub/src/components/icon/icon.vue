<script>

const cache = {}

export default {
  name: 'TheIcon',
  props: {
    svg: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: null,
      validator: v => !v || /xs|sm|lg|xl/.test(v)
    },
    color: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
      validator: v => !v || /image/.test(v)
    },
  },
  data() {
    return {
      html: '<i></i>',
    }
  },
  watch: {
    svg(value) {
      this.getSvgContent()
    },
  },
  created() {
    if (this.svg) {
      this.getSvgContent()
    }
  },
  methods: {
    async getSvgContent() {
      let svg = cache[this.svg]

      if (!svg) {

        try {
          const content = await fetch('/images/' + this.svg + '.svg')
          const contentType = await content.headers.get('content-type')

          if (contentType.indexOf('image/svg') >= 0) {
            svg = await content.text()
            cache[this.svg] = svg
          }
        } catch(e) {
          return false
        }
      }

      if (svg) {
        this.html = svg
        await this.$nextTick()
        const el = this.$el.querySelector('svg')
        if (el) {
          el.classList.add('the-icon__svg')
          el.setAttribute('fill', 'currentColor')
          if (this.type === 'image') {
            el.removeAttribute('height')
            el.removeAttribute('width')
          }
        }
      }
    },
  },
}
</script>

<template>
  <div
    class="the-icon"
    :data-icon="svg"
    :class="[
      color && 'the-icon--' + color,
      size && 'the-icon--' + size,
      type && 'the-icon--' + type,
    ]"
    v-html="html"
  />
</template>

<style lang="scss">
.the-icon {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  font-size: 1.5rem;
  color: inherit;

  &--xs {
    font-size: .9rem;
  }

  &--sm {
    font-size: 1rem;
  }

  &--lg {
    font-size: 1.8rem;
  }

  &--xl {
    font-size: 2rem;
  }

  &--primary {
    color: var(--color-primary);
  }

  &--image {
    width: auto;
    height: auto;
  }

  &__svg {
    display: block;
    width: 100%;
    max-width: inherit;
    height: 100%;
    max-height: inherit;
    fill: currentColor;
  }
}
</style>
