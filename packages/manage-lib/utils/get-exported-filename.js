import dayjs from 'dayjs'
import camelCase from 'lodash/camelCase'

export default tableName => {
  const timestampFormat = `YYYY-MM-DD'T'HH:mm:ss`
  const timestamp = dayjs().format(timestampFormat)
  const camelizedName = camelCase(tableName)
  const formattedName =
    camelizedName.charAt(0).toUpperCase() + camelizedName.slice(1)

  return `${formattedName}_${timestamp}`
}
