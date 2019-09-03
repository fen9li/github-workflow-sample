import FilterType from '../constructor'

export default class BooleanColumn extends FilterType {
  get comparisons() {
    const {
      booleanValues: {
        is_true: isTrue,
        is_false: isFalse,
      }
    } = this
    return {
      is_true: [`is ${ isTrue.label }`, `are ${ isTrue.label }`],
      is_false: [`is ${ isFalse.label }`, `are ${ isFalse.label }`],
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
