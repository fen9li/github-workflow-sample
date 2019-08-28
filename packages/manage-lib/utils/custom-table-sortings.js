
import dayjs from 'dayjs'

// Sorting for columns, where start_at < now < end_at || now < sunsetAt
function datesStatusSorting(order, field) {
  const elasticValue = field + 'At'
  const today = dayjs.utc(dayjs()).startOf('day').valueOf()

  const startData = 'doc.startAt.value.getMillis()'
  const endNotExists = `doc.${elasticValue}.size() == 0`
  const endExists = `doc.${elasticValue}.size() != 0`
  const endDate = `doc.${elasticValue}.value.getMillis()`

  const source = (elasticValue === 'sunsetAt') ?

    `int order = 0; if(${endNotExists} || ${endDate} >= params.today) { order = 1 } else { order = 2 } order;` :

    `int order = 0; if(${startData} <= params.today && ((${endExists} && ${endDate} >= params.today)) || ${endNotExists}) { order = 1 } else { order = 3 } order;`

  return {
    type: 'number',
    order,
    script: {
      lang: 'painless',
      source,
      params: {
        column: field,
        today,
      }
    }
  }
}

export {
  datesStatusSorting,
}
