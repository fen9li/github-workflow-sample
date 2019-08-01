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

function serializeRow(columnLabels, row) {
  const columnsCount = columnLabels.length
  let serializedRow = '\n'

  for (let colIdx=0; colIdx<columnsCount; colIdx++) {
    const colName = columnLabels[colIdx]

    if (colIdx>0) {
      serializedRow += ','
    }

    serializedRow += getSanitizedValue(row[colName])
  }

  return serializedRow
}

export function serializeToCSV(data, columnLabels) {
  const rowCount = data.length
  let fileContent = columnLabels.toString()

  for (let rowIdx=0; rowIdx<rowCount; rowIdx++) {
    const row = data[rowIdx]

    fileContent += serializeRow(columnLabels, row)
  }

  // Wrap result in array coz strings
  // are passed by value in js
  return [fileContent]
}

function workerSerializeToCSV(data, columnLabels) {
  return new Promise(resolve => {
    const worker = new Worker('/workers/csv.worker.js')

    worker.onmessage = e => {
      resolve([e.data])

      worker.terminate()
    }

    worker.postMessage({ data, columnLabels })
  })
}

export default async function exporter(data, columnLabels) {
  let serialized

  if (!window.Worker) {
    serialized = serializeToCSV(data, columnLabels)
  } else {
    try {
      serialized = await workerSerializeToCSV(data, columnLabels)
    } catch (e) {
      console.error(
        'Error while worker serialization. '+
        'Data will be serialized in the main thread.'
      )
      console.error( e)

      // Fallback to serialization in the main thread
      serialized = serializeToCSV(data, columnLabels)
    }
  }

  return new Blob(serialized, { type: 'text/plain;charset=utf-8' })
}
