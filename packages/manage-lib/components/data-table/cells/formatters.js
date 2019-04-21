
import formatDollar from '@lib/utils/format-dollar'
import { formatDate } from '@lib/utils/format-date'
import formatAccount from '@lib/utils/format-account'

const dateTime = v => v ? formatDate(v, 'DD/MM/YYYY hh:mm A') : ''
const dayMonth = v => v ? formatDate(v, 'DD/MM') : ''
const dollar = v => v ? formatDollar(v) : ''
const uppercase = v => v? v.toUpperCase() : ''
const account = v => v ? formatAccount(v) : ''

export default {
  date: (v, format = 'DD/MM/YYYY') => formatDate(v, format),
  dateTime,
  dollar,
  uppercase,
  dayMonth,
  account,
}
