<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'DefaultFilter',
  directives: {
    mask,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    filter: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    comparisons() {
      return this.filter.getComparisons()
    },
    numberMask() {
      const { attribute } = this.filter
      return attribute.includes('amount') || attribute.includes('total') || attribute.includes('price') ?
        ['#.##', '##.##', '###.##', '####.##', '#####.##', '######.##', '#######.##', '########.##'] : '##########'
    }
  },
  watch: {
    'model.comparison'(newVal) {
      if (newVal !== undefined) {
        this.focusInput()
      }
    },
    visible(newVal) {
      if (newVal) {
        this.focusInput()
      }
    },
  },
  mounted() {
    this.focusInput()
  },
  methods: {
    focusInput() {
      this.$nextTick(() => {
        const inputs = this.$refs.input
        if (inputs && inputs.length) {
          const inputComp = inputs[0]

          if (inputComp.hasOwnProperty('toggleMenu')) {
            setTimeout(inputComp.toggleMenu, 250)
          } else if (inputComp.hasOwnProperty('showPicker')) {
            this.$refs.wrap.querySelector('label.is-checked').focus()
          } else {
            const input = inputComp.$refs.input

            if (input) {
              input.focus()
            }
          }
        }
      })
    },
  },
}
</script>

<template>
  <div ref="wrap">
    <div
      v-for="comparison in comparisons"
      :key="comparison.type"
      :class="$style.comparison"
    >
      <el-radio
        v-model="model.comparison"
        :label="comparison.type"
      >
        {{ comparison.label }}
      </el-radio>
      <template v-if="comparison.type === model.comparison">
        <el-input
          v-if="filter.type === 'string'"
          ref="input"
          v-model="model.value"
          :class="$style.comparisonValue"
        />
        <el-input-number
          v-else-if="filter.type === 'numeric'"
          ref="input"
          v-model="model.value"
          v-mask="numberMask"
          controls-position="right"
          :class="$style.comparisonValue"
        />
        <el-date-picker
          v-else-if="filter.type === 'date'"
          ref="input"
          v-model="model.value"
          :class="$style.comparisonValue"
          type="date"
          format="dd/MM/yyyy"
          value-format="dd/MM/yyyy"
          :append-to-body="false"
        />
        <el-date-picker
          v-else-if="filter.type === 'time'"
          ref="input"
          v-model="model.value"
          :class="$style.comparisonValue"
          type="datetime"
          format="dd/MM/yyyy hh:mm"
          value-format="dd/MM/yyyy hh:mm"
          :append-to-body="false"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" module>
.comparison {
  padding: 0 20px;
  margin-bottom: 15px;
}

.comparisonValue {
  width: 100%;
  margin-top: 10px;
}
</style>
