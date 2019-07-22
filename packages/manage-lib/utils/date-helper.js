import dayjs from 'dayjs'

function nextDay() {
  return dayjs().add(1, 'day').startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]')
}

const datePickerFormat = `yyyy-MM-dd'T'HH:mm:ss'Z'`

export {
  nextDay,
  datePickerFormat,
}
