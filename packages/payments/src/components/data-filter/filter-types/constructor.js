import get from 'lodash/get'
import startCase from 'lodash/startCase'
import DefaultFilter from './default-filter'

export default class FilterType {
  constructor(params = {}) {
    this.label = params.label || startCase(params.attribute)
    this.attribute = params.attribute
    this.icon = params.icon
    this.type = params.type
    this.values = params.values
  }

  get filterComponent() {
    return DefaultFilter
  }

  get metaConditions() {
    return {}
  }

  getSummary(filter) {
    const comparison = this.getComparison(filter.comparison)
    const prefix = comparison && comparison.prefix

    if (/null|undefined/.test(filter.value)) {
      return this.label
    } else {
      return `${this.label} ${prefix} ${filter.value}`
    }
  }

  getComparisons() {
    const comparisons = this.comparisons || {}
    return Object.keys(comparisons).map(key => {
      const comparison = comparisons[key]
      return {
        type: key,
        label: comparison[0],
        prefix: comparison[1],
      }
    })
  }

  getComparison(type) {
    const comparisons = this.getComparisons()
    return comparisons.find(i => i.type === type)
  }

  getFirstComparison() {
    const comparisons = this.getComparisons()
    return get(comparisons, '0')
  }
}
