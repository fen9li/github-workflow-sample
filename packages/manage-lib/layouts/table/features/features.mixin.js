import DataProcessor from '../../../processors/data-processor'

export default {
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      required: true,
    },
    processor: {
      type: DataProcessor,
      required: true,
    },
  },
}
