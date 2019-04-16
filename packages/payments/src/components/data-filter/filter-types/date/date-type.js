import dayjs from 'dayjs'
import FilterType from '../constructor'

export default class DateColumn extends FilterType {
  get comparisons() {
    return {
      after: ['is after', 'are after'],
      before: ['is before', 'are before'],
      on: ['is on', 'are on'],
    }
  }

  get formatters() {
    return {
      date(value, format) {
        return dayjs(value).format(format)
      },
    }
  }
}
