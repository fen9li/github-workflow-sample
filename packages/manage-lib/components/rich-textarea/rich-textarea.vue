<script>
import { VPopover } from 'v-tooltip'

export default {
  name: 'BaseRichTextarea',
  components: {
    VPopover
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

      savedSelectionRanges: [],
      savedSelection: null,

      linkURL: '',
      linkTooltipIsVisible: false,
    }
  },
  watch: {
    value() {
      const { localValue, value, skipNextValueWatcher } = this

      if (!(typeof value === 'string')) {
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
  methods: {
    onInput(e) {
      this.skipNextValueWatcher = true

      this.$emit('input', e.target.innerHTML)
    },
    executeCmd(cmdName, args) {
      const { area } = this.$refs

      if (area) {
        area.focus()
      }

      document.execCommand(cmdName, false, args)
    },
    makeSelectedLink() {
      // save current selection to use it later
      this.saveSelection()

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
      const { savedSelectionRanges, linkURL } = this

      if (!linkURL.length) {
        return
      }

      const currentSelection = window.getSelection()
      currentSelection.removeAllRanges()

      // programmatically select the text from previously saved ranges
      savedSelectionRanges.forEach(r => currentSelection.addRange(r))

      this.hideLinkTooltip()

      this.executeCmd('createLink', linkURL)
    },
    saveSelection() {
      const selection = window.getSelection()

      const { rangeCount } = selection
      const ranges = []

      for (let i = 0; i < rangeCount; i++) {
        ranges.push(selection.getRangeAt(i))
      }

      this.savedSelection = selection
      this.savedSelectionRanges = ranges
    },
    hideLinkTooltip() {
      this.linkTooltipIsVisible = false
      this.savedSelection = null
      this.savedSelectionRanges = []
      this.linkURL = ''
    },
    isSelectionContainLink() {
      if (!Selection.prototype.containsNode) {
        return false
      }

      const { savedSelection } = this
      const { area } = this.$refs
      const links = [...area.querySelectorAll('a')]

      return links.some(l => savedSelection.containsNode(l, true))
    },
    removeFormat() {
      this.executeCmd('removeFormat')
      this.executeCmd('unlink')
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
        @click="executeCmd('undo')"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M512 64c-141.384 0-269.376 57.32-362.032 149.978l-149.968-149.978v384h384l-143.532-143.522c69.496-69.492 165.492-112.478 271.532-112.478 212.068 0 384 171.924 384 384 0 114.696-50.292 217.636-130.018 288l84.666 96c106.302-93.816 173.352-231.076 173.352-384 0-282.77-229.23-512-512-512z"
          />
        </svg>
      </div>
      <div
        class="base-rich-textarea__control"
        @click="executeCmd('redo')"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
        >
          <path
            d="M0 576c0 152.924 67.048 290.184 173.35 384l84.666-96c-79.726-70.364-130.016-173.304-130.016-288 0-212.076 171.93-384 384-384 106.042 0 202.038 42.986 271.53 112.478l-143.53 143.522h384v-384l-149.97 149.978c-92.654-92.658-220.644-149.978-362.030-149.978-282.77 0-512 229.23-512 512z"
          />
        </svg>
      </div>
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
