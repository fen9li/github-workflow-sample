<script>
export default {
  name: 'EventOccurrenceLog',
  props: {
    details: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      collapses: [],
    }
  },
  computed: {
    allLogItems() {
      // Temp structure, waiting for real data to adjust
      const { payload, modifiedPayload, rulesUsed, strictLimitsUsed, flexibleLimitsUsed, accountAllocation } = this.details
      const result = []

      if(payload) {
        result.push({ name: 'Original Payload', data: payload })
      }
      if(modifiedPayload) {
        result.push({ name: 'Modified Payload', data: modifiedPayload })
      }
      if(rulesUsed) {
        rulesUsed.forEach(el => {
          result.push({ name: 'Rule Applied', data: el })
        })
      }
      if(strictLimitsUsed || flexibleLimitsUsed) {
        strictLimitsUsed.concat(flexibleLimitsUsed).forEach(el => {
          result.push({ name: 'Limit Applied', data: el })
        })
      }
      if(accountAllocation) {
        result.push({ name: 'Account Allocation', data: accountAllocation })
      }
      return result
    }
  }
}
</script>

<template>
  <div :class="$style.wrapper">
    <span :class="$style.title">Event Occurrence Log</span>
    <div :class="collapses">
      <div
        v-for="(item, index) in allLogItems"
        :key="index.name"
        :class="$style.logItem"
      >
        <div :class="$style.counter">
          {{ index + 1 }}
        </div>
        <el-collapse v-model="collapses">
          <el-collapse-item
            :title="item.name"
            :name="index"
          >
            <div> {{ item.data }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.title {
  display: inline-block;
  padding-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
}

.logItem {
  position: relative;
  display: flex;
  width: 100%;
  margin: .5rem 0;
  :global {
    .el-collapse,
    .el-collapse-item__header,
    .el-collapse-item__wrap {
      font-size: 1.2rem;
      border: none;
    }

    .el-collapse-item__header {
      display: block;
    }

    .el-collapse-item__arrow {
      margin-left: .7rem;
      transform: rotate(90deg)
    }

    .el-collapse-item__arrow.is-active {
      transform: rotate(-90deg)
    }
  }

  &:not(:last-child):after {
    position: absolute;
    top: 1rem;
    left: 1.15rem;
    width: 3px;
    height: 100%;
    content: '';
    background: #F2F2F2;
  }
}


.counter {
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin: .2rem 1rem 0 0;
  background-color: #F2F2F2;
  border-radius: 50%;
}
</style>
