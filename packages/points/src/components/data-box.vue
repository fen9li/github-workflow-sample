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
      </div>
      <slot name="boxHeader" />
    </div>

    <dl :class="['datalist', $style.list]">
      <slot />
    </dl>
  </el-card>
</template>

<style lang="scss" module>
.list {
  flex: 1 0 50%;
  margin-top: 0;

  dt {
    color: black;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}

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
