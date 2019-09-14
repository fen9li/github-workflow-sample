export default {
  data() {
    return {
      mouseDown: false,
      minIframeWidth: 300,
      maxIframeWidth: 0,
      controlOffset: 0,
    }
  },
  watch: {
    isAdaptive: {
      handler(newVal) {
        if (newVal) {
          this.enableAdaptiveView()
        } else {
          this.disableAdaptiveView()
        }
      },
      immediate: true,
    },
  },
  computed: {
    isAdaptive() {
      return this.viewport === 'adaptive'
    },
  },
  methods: {
    enableAdaptiveView() {
      this.$nextTick(() => {
        const { iframe } = this.$refs

        this.maxIframeWidth = iframe.clientWidth
      })

      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onControlMouseup)
    },
    disableAdaptiveView() {
      this.$nextTick(() => {
        const { iframe } = this.$refs

        if (iframe) {
          iframe.style.width = ''
        }
      })

      this.maxIframeWidth = 0
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onControlMouseup)

      this.onControlMouseup()
    },

    onControlMousedown(e) {
      const { target } = e
      const { side } = target.dataset
      const controlRect = target.getBoundingClientRect()

      if (side === 'left') {
        this.controlOffset = controlRect.right - e.clientX
      } else {
        this.controlOffset = controlRect.left - e.clientX
      }

      this.mouseDown = true
    },
    onControlMouseup() {
      this.controlOffset = 0
      this.mouseDown = false
    },
    onMouseMove(e) {
      if (!this.mouseDown) {
        return
      }

      const { minIframeWidth, maxIframeWidth, controlOffset } = this
      const { iframe, rootInner } = this.$refs
      const rootRect = rootInner.getBoundingClientRect()

      const halfIframeWidthCoord = (rootRect.right - rootRect.left) / 2
      const mouseCoord = e.clientX + controlOffset - rootRect.left

      let iframeWidth = 2 * Math.abs(mouseCoord - halfIframeWidthCoord)

      if (iframeWidth < minIframeWidth) {
        iframeWidth = minIframeWidth
      } else if (iframeWidth > maxIframeWidth) {
        iframe.style.width = ''

        return
      }

      iframe.style.width = `${iframeWidth}px`
    },
  },
}
