import dayjs from 'dayjs'

export default function dateIsSame(a, b) {
  return dayjs(a).isSame(dayjs(b))
}
