import FilterType from '../constructor'
import DateStatusFilter from './date-status-filter'
import capitalize from 'lodash/capitalize'

export default class SelectColumn extends FilterType {
  get comparisons() {
    return {
      betweenDates: [''],
    }
  }

  get filterComponent() {
    return DateStatusFilter
  }

  getSummary(filter) {
    return `Status: ${capitalize(filter.value)}`
  }
}
