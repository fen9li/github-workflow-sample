const exporterFileRE = /^\.\/(.*)\.exporter\.js$/
const requireExporter = require.context('.', false, /^\.\/.*\.exporter\.js$/)

const exportersMap = {}

requireExporter.keys().forEach(fileName => {
  const exporter = requireExporter(fileName).default
  const exporterName = fileName.match(exporterFileRE)[1]

  exportersMap[exporterName] = exporter
})

export default exportersMap
