<script>
import capitalize from 'lodash/capitalize'

export default {
  name: 'DataBox',
  props: {
    header: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    statusObj: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    capitalizedStatus() {
      return capitalize(this.status)
    },
  },
}
</script>

<template>
  <el-card>
    <div
      v-if="header"
      slot="header"
      :class="$style.header"
    >
      <div :class="$style.title">
        {{ header }}

        <div
          v-if="capitalizedStatus"
          :class="[$style.status, $style[`status${capitalizedStatus}`]]"
        >
          <el-icon
            :name="status === 'active' ? 'check' : 'close'"
            :class="$style.statusIcon"
          />
          <span>{{ capitalizedStatus }}</span>
        </div>
        <div
          v-else-if="statusObj"
          :class="$style.status"
          :style="{color: statusObj.color}"
        >
          <el-icon
            :name="statusObj.icon"
            :class="$style.statusIcon"
          />
          <span>{{ statusObj.label }}</span>
        </div>
      </div>
      <slot name="boxHeader" />
    </div>

    <slot />
  </el-card>
</template>

<style lang="scss" module>

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  display: flex;
  flex: 1 0 50%;
  align-items: center;
}

.status {
  padding: 0;
  margin-left: rem(85px);
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
