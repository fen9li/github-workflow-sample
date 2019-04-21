import FilterType from '../constructor'

export default class StringColumn extends FilterType {
  get name() {
    return 'string'
  }

  get comparisons() {
    return {
      contains: ['contains', 'contain'],
      doesnt_contain: [`doesn't contain`, `don't contain`],
      eq: ['is', 'are'],
      starts: ['starts with', 'start with'],
      ends: ['ends with', 'end with'],
    }
  }

  get metaConditions() {
    return {
      is(value, condValue) {
        return value === condValue
      },
    }
  }
}
