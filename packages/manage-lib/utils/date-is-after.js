import dayjs from 'dayjs'

export default function dateIsAfter(a, b) {
  return dayjs(a).isAfter(dayjs(b))
}
