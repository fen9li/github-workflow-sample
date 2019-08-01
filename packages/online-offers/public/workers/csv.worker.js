/* eslint-disable */
// This file should be in es5
var doubleQuoteRE = '/"/g'

function getSanitizedValue(value) {
  if (value === undefined) {
    return '""'
  }

  if (typeof value === 'string') {
    var shouldWrap = false

    if (value.indexOf('"') !== -1) {
      value = value.replace(doubleQuoteRE, '"')
      shouldWrap = true
    }

    if (
      shouldWrap ||
      value.indexOf(',') !== -1 ||
      value.indexOf('\n') !== -1
    ) {
      return '"' + value + '"'
    }
  }

  return value
}

function serializeRow(columnLabels, row) {
  var columnsCount = columnLabels.length
  var serializedRow = '\n'

  for (var colIdx=0; colIdx<columnsCount; colIdx++) {
    var colName = columnLabels[colIdx]

    if (colIdx>0) {
      serializedRow += ','
    }

    serializedRow += getSanitizedValue(row[colName])
  }

  return serializedRow
}

function serializeToCSV(data, columnLabels) {
  var rowCount = data.length
  var fileContent = columnLabels.toString()

  for (var rowIdx=0; rowIdx<rowCount; rowIdx++) {
    var row = data[rowIdx]

    fileContent += serializeRow(columnLabels, row)
  }

  // Wrap result in array coz strings
  // are passed by value in js
  return [fileContent]
}

onmessage = function(e) {
  var eventPayload = e.data
  var data = eventPayload.data
  var columnLabels = eventPayload.columnLabels
  var serialized = serializeToCSV(data, columnLabels)
  var blob = new Blob(serialized, { type: 'text/plain;charset=utf-8' })

  var reader = new FileReader()

  reader.onload = function() {
    var buffer = reader.result

    blob = serialized = null

    // We intentionally use here an ArrayBuffer
    // https://developer.mozilla.org/en-US/docs/Web/API/Transferable
    postMessage(buffer, [buffer])
  }

  reader.readAsArrayBuffer(blob)
}
