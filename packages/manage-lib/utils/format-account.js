export default function formatAccount(value, count = 3) {
  return `*** ${value.toString().slice(-count)}`
}
