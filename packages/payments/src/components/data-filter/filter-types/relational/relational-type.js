import FilterType from '../constructor'

export default class RelationalColumn extends FilterType {
  get name() {
    return 'relational'
  }

  get comparisons() {
    return {
      eq: ['is', 'are'],
    }
  }
}
