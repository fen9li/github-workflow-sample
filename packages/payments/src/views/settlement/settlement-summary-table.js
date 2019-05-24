const TABLE_COLUMNS = [
  {
    name: 'name',
    label: '',
    sortable: false,
  },
  {
    name: 'count',
    label: 'Count',
    align: 'right',
    remWidth: 6,
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'dollar',
    align: 'right',
  },
  {
    name: 'fee',
    label: 'Fee',
    format: 'dollar',
    align: 'right',
    width: '150rem',
  },
  {
    name: 'net',
    label: 'NET',
    format: 'dollar',
    align: 'right',
  },
]


export default {
  columns: TABLE_COLUMNS,
}
