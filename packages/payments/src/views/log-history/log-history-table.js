const dateFormat = 'DD/MM/YYYY hh:mm A'

const TABLE_FILTERS = [
  {
    attribute: 'logDate',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'logDescription',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'logStatus',
    type: 'string',
    icon: 'el-icon-star-off',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'logDate',
    label: 'Date',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'logDescription',
    label: 'Description',
    icon: 'el-icon-document',
  },
  {
    name: 'logStatus',
    label: 'Status',
    icon: 'el-icon-document',
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
