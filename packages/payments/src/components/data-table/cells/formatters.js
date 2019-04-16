
import formatDollar from '@utils/format-dollar'
import { formatDate } from '@utils/format-date'

const dateTime = v => v ? formatDate(v, 'DD/MM/YYYY hh:mm A') : ''
const dayMonth = v => v ? formatDate(v, 'DD/MM') : ''
const dollar = v => v ? formatDollar(v) : ''
const uppercase = v => v? v.toUpperCase() : ''

export default {
  date: (v, format = 'DD/MM/YYYY') => formatDate(v, format),
  dateTime,
  dollar,
  uppercase,
  dayMonth,
}
