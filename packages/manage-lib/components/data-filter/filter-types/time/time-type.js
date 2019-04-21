import FilterType from '../constructor'

export default class TimeColumn extends FilterType {
  get name() {
    return 'time'
  }

  get comparisons() {
    return {
      after: ['is after', 'are after'],
      before: ['is before', 'are before'],
      on: ['is on', 'are on'],
    }
  }
}
