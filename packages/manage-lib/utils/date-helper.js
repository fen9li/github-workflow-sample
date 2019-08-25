import dayjs from 'dayjs'

function nextDay() {
  return dayjs().add(1, 'day').startOf('day').format('YYYY-MM-DDTHH:mm:ss[Z]')
}

function dateIsAfter(dateOne, dateTwo) {
  // Check that dateOne is after dateTwo
  return dayjs(dateOne).isAfter(dayjs(dateTwo))
}

function activeByDate(startAt, endAt) {
  const started = dayjs().isAfter(dayjs(startAt)) || sameDate(startAt, dayjs())

  if(endAt) {
    return started && dayjs().isBefore(dayjs(endAt).endOf('day'))
  } else {
    return started
  }
}

function sameDate(dateOne, dateTwo) {
  return dayjs(dateOne).startOf('day').isSame(dayjs(dateTwo).startOf('day'))
}

const datePickerFormat = `yyyy-MM-dd'T'HH:mm:ss'Z'`

export {
  nextDay,
  datePickerFormat,
  dateIsAfter,
  activeByDate,
  sameDate
}
