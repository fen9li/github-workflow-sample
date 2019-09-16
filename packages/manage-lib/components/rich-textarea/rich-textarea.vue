<script>
import { VPopover } from 'v-tooltip'

export default {
  name: 'BaseRichTextarea',
  components: {
    VPopover,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localValue: this.value,
      skipNextValueWatcher: false,
      readInputInNextTick: false,

      savedSelection: null,
      savedSelectionRanges: [],
      linkURL: '',
      linkTooltipIsVisible: false,

      fontSizeChangingStep: 0.25, // em
      maxAvailFontSize: 5, // em
      defaultFontSize: 1, // em
      minAvailFontSize: 0.25, // em
      fontSizeSeries: [],
    }
  },
  watch: {
    value() {
      const { localValue, value, skipNextValueWatcher } = this

      if (typeof value !== 'string') {
        this.localValue = ''
      } else if (localValue !== value) {
        // Avoid of unwanted innerHTML re-rendering and blur event
        if (skipNextValueWatcher) {
          this.skipNextValueWatcher = false
        } else {
          this.localValue = value
        }
      }
    },
  },
  created() {
    this.createSizeSeries()
  },
  mounted() {
    this.selection = window.getSelection()

    this.addEditLinkListeners()
  },
  methods: {
    onInput({ target }) {
      this.skipNextValueWatcher = true

      if (this.readInputInNextTick) {
        this.readInputInNextTick = false

        this.$nextTick(() => {
          this.$emit('input', target.innerHTML)
        })
      } else {
        this.$emit('input', target.innerHTML)
      }
    },
    executeCmd(cmdName, args) {
      const { area } = this.$refs

      if (area) {
        area.focus()
      }

      document.execCommand(cmdName, false, args)
    },
    executeStyleCmd(cmdName, args) {
      const { area } = this.$refs

      if (area) {
        area.focus()
      }

      // use style attr instead of html tag
      document.execCommand('styleWithCSS', false, true)
      document.execCommand(cmdName, false, args)
      document.execCommand('styleWithCSS', false, false)
    },

    isSelectionContainLink() {
      const { selection } = this
      const { area } = this.$refs
      const links = [...area.querySelectorAll('a')]

      return links.some(l => selection.containsNode(l, true))
    },
    saveSelectedRanges() {
      const { selection } = this
      const { rangeCount } = selection
      const ranges = []

      for (let i = 0; i < rangeCount; i++) {
        ranges.push(selection.getRangeAt(i))
      }

      this.savedSelectionRanges = ranges
    },
    makeSelectedLink() {
      // save current selection to use it later
      this.saveSelectedRanges()

      // nothing is selected - noop
      if (!this.savedSelectionRanges.length) {
        return
      }

      // remove links if there are some inside selection
      if (this.isSelectionContainLink()) {
        this.executeCmd('unlink')
      } else {
        // no links inside selection - open tooltip
        // to type url link
        this.linkTooltipIsVisible = true
      }
    },
    applyLinkURL() {
      const { savedSelectionRanges, linkURL, selection } = this

      if (!linkURL.length) {
        return
      }

      selection.removeAllRanges()

      // programmatically select the text from previously saved ranges
      savedSelectionRanges.forEach(r => selection.addRange(r))

      this.hideLinkTooltip()

      this.executeCmd('createLink', linkURL)
      this.addEditLinkListeners()

      selection.removeAllRanges()
    },
    hideLinkTooltip() {
      this.linkTooltipIsVisible = false
      this.savedSelectionRanges = []
      this.linkURL = ''
    },
    updateLinkURL({ target }) {
      const hrefRange = document.createRange()

      hrefRange.selectNode(target)
      this.savedSelectionRanges.push(hrefRange)

      this.linkURL = target.getAttribute('href')
      this.linkTooltipIsVisible = true
    },
    addEditLinkListeners() {
      const { area } = this.$refs
      const hrefList = [...area.querySelectorAll('a')]

      hrefList.forEach(h => {
        h.removeEventListener('click', this.updateLinkURL)
        h.addEventListener('click', this.updateLinkURL)
      })
    },

    createSizeSeries() {
      const {
        fontSizeChangingStep,
        maxAvailFontSize,
        minAvailFontSize,
        fontSizeSeries,
      } = this
      let current = minAvailFontSize

      while (current < maxAvailFontSize) {
        fontSizeSeries.push(current)

        current += fontSizeChangingStep
      }

      fontSizeSeries.push(maxAvailFontSize)
    },
    getElsWithSizeStyle() {
      const { selection } = this
      const { area } = this.$refs
      const nodes = [...area.querySelectorAll('[style*=font-size]')]

      // choose only ones that are inside selection
      return nodes.filter(fn => selection.containsNode(fn, true))
    },
    getFontSizeInSelection() {
      const { defaultFontSize } = this
      const nodesList = this.getElsWithSizeStyle()
      const sizesList = nodesList.map(n => parseFloat(n.style.fontSize))

      const result = {
        min: defaultFontSize,
        max: defaultFontSize,
      }

      // There are may be many sizes under selection
      // but we need to get a single value from them all.
      // To do that we search for a minimum and maximum values.
      // We will use min value for font size decreasing and
      // max value for increasing.
      if (sizesList.length) {
        result.min = Math.min(...sizesList)
        result.max = Math.max(...sizesList)
      }

      return result
    },
    getNextFontSize() {
      const { fontSizeSeries } = this
      const seriesLength = fontSizeSeries.length
      const currentFontSize = this.getFontSizeInSelection().max
      let nextSizeIndex = -1

      for (let i = 0; i < seriesLength; i++) {
        const value = fontSizeSeries[i]

        // choose the first bigger value than current
        if (value > currentFontSize) {
          nextSizeIndex = i
          break
        }
      }

      if (nextSizeIndex === -1) {
        nextSizeIndex = seriesLength - 1
      }

      return fontSizeSeries[nextSizeIndex]
    },
    getPrevFontSize() {
      const { fontSizeSeries } = this
      const seriesLength = fontSizeSeries.length
      const currentFontSize = this.getFontSizeInSelection().min
      let prevSizeIndex = -1

      for (let i = seriesLength - 1; i >= 0; i--) {
        const value = fontSizeSeries[i]

        // choose the first smaller value than current
        if (value < currentFontSize) {
          prevSizeIndex = i
          break
        }
      }

      if (prevSizeIndex === -1) {
        prevSizeIndex = 0
      }

      return fontSizeSeries[prevSizeIndex]
    },
    increaseFontSize() {
      const { executeStyleCmd, defaultFontSize } = this
      const nextFontSize = this.getNextFontSize()

      if (nextFontSize === defaultFontSize) {
        executeStyleCmd('fontSize', 3) // 3 is a default
      } else {
        this.readInputInNextTick = true

        executeStyleCmd('fontSize', 2)

        const nodesList = this.getElsWithSizeStyle()

        nodesList.forEach(n => {
          n.style.fontSize = `${nextFontSize}em`
        })
      }
    },
    decreaseFontSize() {
      const { executeStyleCmd, defaultFontSize } = this
      const prevFontSize = this.getPrevFontSize()

      if (prevFontSize === defaultFontSize) {
        executeStyleCmd('fontSize', 3) // 3 is a default
      } else {
        this.readInputInNextTick = true

        executeStyleCmd('fontSize', 2)

        const nodesList = this.getElsWithSizeStyle()

        nodesList.forEach(n => {
          n.style.fontSize = `${prevFontSize}em`
        })
      }
    },

    isAnythingSelected() {
      const { area } = this.$refs
      const { selection } = this
      const { rangeCount } = selection

      if (rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const { startOffset, endOffset, commonAncestorContainer } = range

        if (
          area.contains(commonAncestorContainer) &&
          startOffset !== endOffset
        ) {
          return true
        }
      }

      return false
    },
    removeFormat() {
      if (!this.isAnythingSelected()) {
        this.executeCmd('selectAll')
      }

      this.executeCmd('removeFormat')
      this.executeCmd('unlink')

      this.selection.removeAllRanges()
    },
  },
}
</script>

<template>
  <div class="base-rich-textarea">
    <div class="base-rich-textarea__controls">
      <div
        class="base-rich-textarea__control"
        @click="executeCmd('bold')"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M707.88 484.652c37.498-44.542 60.12-102.008 60.12-164.652 0-141.16-114.842-256-256-256h-320v896h384c141.158 0 256-114.842 256-256 0-92.956-49.798-174.496-124.12-219.348zM384 192h101.5c55.968 0 101.5 57.42 101.5 128s-45.532 128-101.5 128h-101.5v-256zM543 832h-159v-256h159c58.45 0 106 57.42 106 128s-47.55 128-106 128z"
          />
        </svg>
      </div>
      <div
        class="base-rich-textarea__control"
        @click="executeCmd('underline')"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M704 64h128v416c0 159.058-143.268 288-320 288-176.73 0-320-128.942-320-288v-416h128v416c0 40.166 18.238 78.704 51.354 108.506 36.896 33.204 86.846 51.494 140.646 51.494s103.75-18.29 140.646-51.494c33.116-29.802 51.354-68.34 51.354-108.506v-416zM192 832h640v128h-640z"
          />
        </svg>
      </div>
      <div
        class="base-rich-textarea__control"
        @click="executeCmd('italic')"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M896 64v64h-128l-320 768h128v64h-448v-64h128l320-768h-128v-64z"
          />
        </svg>
      </div>
      <div
        class="base-rich-textarea__control"
        @click="increaseFontSize"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M194.018 832l57.6-192h264.764l57.6 192h113.632l-192-640h-223.232l-192 640h113.636zM347.618 320h72.764l57.6 192h-187.964l57.6-192zM704 832l160-256 160 256h-320z"
          />
        </svg>
      </div>
      <div
        class="base-rich-textarea__control"
        @click="decreaseFontSize"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M194.018 832l57.6-192h264.764l57.6 192h113.632l-192-640h-223.232l-192 640h113.636zM347.618 320h72.764l57.6 192h-187.964l57.6-192zM1024 192l-160 256-160-256h320z"
          />
        </svg>
      </div>
      <div
        class="base-rich-textarea__control"
        @click="makeSelectedLink"
      >
        <v-popover
          placement="right"
          :open="linkTooltipIsVisible"
          trigger="manual"
          @hide="hideLinkTooltip"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M440.236 635.766c-13.31 0-26.616-5.076-36.77-15.23-95.134-95.136-95.134-249.934 0-345.070l192-192c46.088-46.086 107.36-71.466 172.534-71.466s126.448 25.38 172.536 71.464c95.132 95.136 95.132 249.934 0 345.070l-87.766 87.766c-20.308 20.308-53.23 20.308-73.54 0-20.306-20.306-20.306-53.232 0-73.54l87.766-87.766c54.584-54.586 54.584-143.404 0-197.99-26.442-26.442-61.6-41.004-98.996-41.004s-72.552 14.562-98.996 41.006l-192 191.998c-54.586 54.586-54.586 143.406 0 197.992 20.308 20.306 20.306 53.232 0 73.54-10.15 10.152-23.462 15.23-36.768 15.23z"
            />
            <path
              d="M256 1012c-65.176 0-126.45-25.38-172.534-71.464-95.134-95.136-95.134-249.934 0-345.070l87.764-87.764c20.308-20.306 53.234-20.306 73.54 0 20.308 20.306 20.308 53.232 0 73.54l-87.764 87.764c-54.586 54.586-54.586 143.406 0 197.992 26.44 26.44 61.598 41.002 98.994 41.002s72.552-14.562 98.998-41.006l192-191.998c54.584-54.586 54.584-143.406 0-197.992-20.308-20.308-20.306-53.232 0-73.54 20.306-20.306 53.232-20.306 73.54 0.002 95.132 95.134 95.132 249.932 0.002 345.068l-192.002 192c-46.090 46.088-107.364 71.466-172.538 71.466z"
            />
          </svg>
          <div
            slot="popover"
            class="base-rich-textarea__tooltip"
          >
            <el-input
              v-model="linkURL"
              placeholder="Type url..."
              @keydown.native.prevent.enter="applyLinkURL"
            />
            <el-button
              size="sm"
              :disabled="linkURL.length <= 1"
              icon="el-icon-check"
              @click="applyLinkURL"
            />
          </div>
        </v-popover>
      </div>
      <div class="base-rich-textarea__divider" />
      <div
        class="base-rich-textarea__control"
        @click="removeFormat"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M870.298 214.016l-161.485-124.16c-44.646-34.355-109.312-25.907-143.718 18.688l-430.080 557.926c-34.355 44.595-25.958 109.158 18.688 143.514l161.434 124.16c44.646 34.355 109.312 25.907 143.718-18.688l430.131-557.926c34.355-44.595 25.958-109.158-18.688-143.514zM437.658 843.11l-27.494 34.867c-7.782 10.086-19.712 15.872-32.717 15.872-6.349 0-15.821-1.485-24.832-8.397l-161.434-124.16c-8.602-6.605-14.080-16.23-15.514-27.136s1.434-21.606 8.038-30.157l27.494-34.867c7.782-10.086 19.712-15.923 32.768-15.923 6.349 0 15.821 1.485 24.832 8.397l161.485 124.16c8.602 6.605 14.080 16.23 15.514 27.136 1.331 10.906-1.536 21.606-8.141 30.208z"
          />
        </svg>
      </div>
    </div>

    <div
      ref="area"
      contenteditable="true"
      class="base-rich-textarea__area"
      @input="onInput"
      v-html="localValue"
    />
  </div>
</template>

<style src="./rich-textarea.scss" lang="scss" />
