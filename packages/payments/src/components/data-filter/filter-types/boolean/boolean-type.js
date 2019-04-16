import FilterType from '../constructor'

export default class BooleanColumn extends FilterType {
  get comparisons() {
    return {
      is_true: ['is true', 'are true'],
      is_false: ['is false', 'are false'],
    }
  }

  getSummary(column, filter) {
    const comparison = this.getComparison(filter.comparison)
    const { value } = filter

    if (value instanceof Array && value.length > 0) {
      return column.label + comparison.prefix + value.join(', ')
    } else {
      return column.label
    }
  }
}
