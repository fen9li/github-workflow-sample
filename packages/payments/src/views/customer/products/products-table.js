const dateFormat = 'DD/MM/YYYY hh:mm A'

const TABLE_FILTERS = [
  {
    attribute: 'startDate',
    label: 'Start Date',
    icon: 'el-icon-date',
    type: 'date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'startDate',
    icon: 'el-icon-document',
    width: 150,
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'endDate',
    icon: 'el-icon-document',
    width: 150,
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'productName',
    icon: 'el-icon-document',
  },
]

export default {
  columns: TABLE_COLUMNS,
  filters: TABLE_FILTERS,
}
