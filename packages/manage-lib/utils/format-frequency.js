export default function formatFrequency(value) {
  switch (value) {
    case 'P1M': return 'Monthly'
    case 'P3M': return 'Quarterly'
    case 'P1Y': return 'Yearly'
    default: return '-'
  }
}
