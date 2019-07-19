import dayjs from 'dayjs'

function nextDay() {
  const utcOffset = new Date().getTimezoneOffset()
  return dayjs().add(1, 'day').startOf('day').add(Math.abs(utcOffset), 'minute').toString()
}

const datePickerFormat = `yyyy-MM-dd'T'HH:mm:ss'Z'`

export {
  nextDay,
  datePickerFormat,
}
