<script>
export default {
  name: 'BaseRichRenderer',
  props: {
    html: {
      type: String,
      default: '',
    },
  },
  watch: {
    html() {
      this.$nextTick(this.attachLinkListeners)
    },
  },
  mounted() {
    this.attachLinkListeners()
  },
  methods: {
    linkListener(e) {
      const link = e.target

      // router-link emulation
      e.preventDefault()

      this.$router.push(link.getAttribute('href'))
    },
    attachLinkListeners() {
      const links = [...this.$el.querySelectorAll('a')]

      links.forEach(l => {
        const isInternal = l.hostname === window.location.hostname

        if (isInternal) {
          l.addEventListener('click', this.linkListener)
        } else {
          l.target = '_blank'
        }

        // l.classList.add('link')
      })
    },
  },
}
</script>

<template>
  <div
    class="base-rich-renderer"
    v-html="html"
  />
</template>

<style src="./rich-renderer.scss" lang="scss" />
