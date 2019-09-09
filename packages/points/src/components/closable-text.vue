<script>
export default {
  name: 'ClosableText',
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'info',
      validator: v => !v || /info/.test(v),
    },
  },
  data() {
    return {
      open: true,
    }
  },
  methods: {
    onClose() {
      this.open = false
    },
  },
}
</script>

<template>
  <div
    v-if="open"
    :class="$style.container"
  >
    <i
      :class="[
        `el-icon-${ icon }`,
        $style.icon,
      ]"
    />
    <div :class="$style.text">
      {{ text }}
    </div>
    <i
      :class="[
        'el-icon-close',
        $style.close,
      ]"
      @click="onClose"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  padding: rem(10px);
  background-color: #f4f4f4;
  border-radius: rem(4px);
}

.icon,
.text,
.close {
  color: #9a9da3;
}

.icon {
  margin-right: rem(10px);
}

.text {
  word-break: break-word;
}

.close {
  margin-left: rem(10px);
  font-weight: 600;
  cursor: pointer;
}
</style>
