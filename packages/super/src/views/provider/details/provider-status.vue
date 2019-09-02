<script>
import capitalize from 'lodash/capitalize'
export default {
  name: 'ProviderStatus',
  props: {
    status: {
      type: String,
      required: true,
    }
  },
  computed: {
    key() {
      return capitalize(this.status)
    }
  },
  methods: {
    capitalize,
  },
}
</script>

<template>
  <div
    :class="[
      $style.status,
      $style[`status${key}`]
    ]"
  >
    <el-icon
      :name="status === 'active' ? 'check' : 'close'"
      :class="$style.statusIcon"
    />
    <span>{{ key }}</span>
  </div>
</template>

<style lang="scss" module>
.status {
  padding: 0;
  margin: rem(0 0 0 80px);
  font-size: 1rem;
}

.statusActive {
  color: #36d544;
}

.statusInactive {
  color: #e21d1f;
}

.statusIcon {
  margin-right: rem(10px);
}
</style>
