import dayjs from 'dayjs'

export function formatDate(value, format, useUTC = true) {
  if (!format) {
    throw Error('"date" formatter requires format argument')
  }

  if (!value) {
    return '-'
  }

  if (useUTC) {
    const utcOffset = new Date().getTimezoneOffset()

    return dayjs
      .utc(value)
      .add(utcOffset, 'minute')
      .format(format)
  } else {
    return dayjs(value).format(format)
  }
}
