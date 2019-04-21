const doubleQuoteRE = '/"/g'

function getSanitizedValue(value) {
  if (value === undefined) {
    return '""'
  }

  if (typeof value === 'string') {
    let shouldWrap = false

    if (value.indexOf('"') !== -1) {
      value = value.replace(doubleQuoteRE, '"')
      shouldWrap = true
    }

    if (
      shouldWrap ||
      value.indexOf(',') !== -1 ||
      value.indexOf('\n') !== -1
    ) {
      return `"${value}"`
    }
  }

  return value
}

function serializeRow(columnNames, row) {
  const columnsCount = columnNames.length
  let serializedRow = '\n'

  for (let colIdx=0; colIdx<columnsCount; colIdx++) {
    const colName = columnNames[colIdx]

    if (colIdx>0) {
      serializedRow += ','
    }

    serializedRow += getSanitizedValue(row[colName])
  }

  return serializedRow
}

export function serializeToCSV(data, columnNames) {
  const rowCount = data.length
  let fileContent = columnNames.toString()

  for (let rowIdx=0; rowIdx<rowCount; rowIdx++) {
    const row = data[rowIdx]

    fileContent += serializeRow(columnNames, row)
  }

  // Wrap result in array coz strings
  // are passed by value in js
  return [fileContent]
}

function workerSerializeToCSV(data, columnNames) {
  return new Promise(resolve => {
    const worker = new Worker('/workers/csv.worker.js')

    worker.onmessage = e => {
      resolve([e.data])

      worker.terminate()
    }

    worker.postMessage({ data, columnNames })
  })
}

export default async function exporter({ data }, columns) {
  const columnNames = columns.map(c => c.name)
  let serialized

  if (!window.Worker) {
    serialized = serializeToCSV(data, columnNames)
  } else {
    try {
      serialized = await workerSerializeToCSV(data, columnNames)
    } catch (e) {
      console.error(
        'Error while worker serialization. '+
        'Data will be serialized in main thread.'
      )
      console.error( e)

      // Fallback to serialization in main thread
      serialized = serializeToCSV(data, columnNames)
    }
  }

  return new Blob(serialized, { type: 'text/plain;charset=utf-8' })
}
