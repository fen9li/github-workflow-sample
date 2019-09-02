export default function amountMask(v) {
  if(/^-?\d*\.?\d*$/.test(v)) {
    const decimal = v.indexOf('.')
    return `${decimal !== -1 ? v.slice(0, decimal +3) : v}`
  } else return v.slice(0, -1)
}
