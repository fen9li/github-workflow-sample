import dayjs from 'dayjs'

export default function isPast(date) {
  if (!date) {
    throw Error('Please provide a date to compare')
  }
  return dayjs().isAfter(dayjs(date))
}
