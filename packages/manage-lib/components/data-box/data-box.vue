<script>
import get from 'lodash/get'

export default {
  name: 'DataBox',
  props: {
    header: {
      type: String,
      default: '',
    },
    status: {
      type: [String, Object],
      default: () => ({
        icon: 'close',
        label: 'Inactive',
        color: '#e21d1f'
      }),
      validator: v => {
        if (typeof v === 'string') {
          return ['active', 'inactive'].includes(v)
        }
        return true
      },
    },
  },
  data() {
    return {
      defaultStatuses: {
        active: {
          icon: 'check',
          label: 'Active',
          color: '#36d544'
        },
        inactive: {
          icon: 'close',
          label: 'Inactive',
          color: '#e21d1f'
        },
      },
    }
  },
  computed: {
    statusObj() {
      if (typeof this.status === 'string') {
        return get(this.defaultStatuses, this.status, {})
      } else {
        return this.status
      }
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
          :class="$style.status"
          :style="{color: statusObj.color}"
        >
          <el-icon
            v-if="statusObj.icon"
            :name="statusObj.icon"
            :class="$style.statusIcon"
          />
          <span v-if="statusObj.label">{{ statusObj.label }}</span>
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

.statusIcon {
  margin-right: rem(10px);
}
</style>
