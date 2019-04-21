import FilterType from '../constructor'
import formatDollar from '@lib/utils/format-dollar'

export default class NumericColumn extends FilterType {
  get name() {
    return 'numeric'
  }

  get comparisons() {
    return {
      eq: ['is', 'are'],
      gt: ['more than', 'more than'],
      lt: ['less than', 'less than'],
    }
  }

  get formatters() {
    return {
      dollar: v => formatDollar(v),
    }
  }

  get metaConditions() {
    return {
      negative(value) {
        return value < 0
      },
    }
  }
}
