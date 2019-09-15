<script>
import PreviewMixin from '~/widgets/preview.mixin'

export default {
  name: 'PreviewContent',
  mixins: [PreviewMixin],
}
</script>

<template>
  <div :class="$style.root">
    <div
      v-if="title"
      :class="$style.title"
      v-html="title"
    />
    <div
      v-if="text"
      :class="$style.text"
      v-html="text"
    />
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
}

.title,
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  * {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
}

.title {
  font-weight: bold;
}
</style>
