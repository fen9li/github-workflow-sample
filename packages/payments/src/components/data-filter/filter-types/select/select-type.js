import FilterType from '../constructor'
import SelectFilter from './select-filter'

export default class SelectColumn extends FilterType {
  get comparisons() {
    return {
      select: [': ', ': '],
    }
  }

  get filterComponent() {
    return SelectFilter
  }

  getSummary(filter) {
    const comparison = this.getComparison(filter.comparison)
    const { value } = filter

    if (value instanceof Array && value.length > 0) {
      return this.label + comparison.prefix + value.join(', ')
    }
    return this.label
  }

  get metaConditions() {
    return {
      is(value, condValue) {
        return value === condValue
      },
    }
  }
}
