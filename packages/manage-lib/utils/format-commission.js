import formatDollar from '@lib/utils/format-dollar'
import capitalize from 'lodash/capitalize'

export default function formatCommission({ base, min, max, type }) {
  if (!type) {
    return null
  }
  const comissionType = type ? type.toLowerCase() : null
  const format = comissionType !== 'percentage'
  return {
    min: `Min: ${format ? formatDollar(min) : min}`,
    max: `Max: ${format ? formatDollar(max): max}`,
    base: `Base: ${format ? formatDollar(base) : base}`,
    type: capitalize(type),
  }
}
