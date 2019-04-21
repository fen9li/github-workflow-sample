const TABLE_COLUMNS = [
  {
    name: 'name',
    label: '',
    sortable: false,
    component: {
      props: {
        styleObj() {
          return { fontSize: '1.125rem' }
        },
      },
    },
  },
  {
    name: 'type',
    label: 'Type',
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'dollar',
  },
  {
    name: 'fee',
    label: 'Fee',
    format: 'dollar',
  },
  {
    name: 'net',
    label: 'NET',
    format: 'dollar',
  },
]


export default {
  columns: TABLE_COLUMNS,
}
