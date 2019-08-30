import FilterType from '../constructor'

export default class BooleanColumn extends FilterType {
  get comparisons() {
    return {
      is_true: ['is active', 'are active'],
      is_false: ['is inactive', 'are inactive'],
    }
  }

  getSummary(column) {
    const comparison = this.getComparison(column.comparison)
    const {
      value,
      label,
    } = column

    if (typeof value === 'boolean') {
      return `${ label } ${ comparison.label }`
    } else {
      return label
    }
  }
}
