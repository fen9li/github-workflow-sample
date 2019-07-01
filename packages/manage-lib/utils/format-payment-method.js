import capitalize from 'lodash/capitalize'

export default function formatMethod(method) {
  return `*** ${method.pan.toString().slice(-4)} ${capitalize(method.type.replace('_', ' '))}`
}
