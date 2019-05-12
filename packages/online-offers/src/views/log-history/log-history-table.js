const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'method',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'url',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'id',
    label: 'ID',
    icon: 'el-icon-document',
  },
  {
    name: 'createdAt',
    label: 'Date',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'method',
    label: 'Method',
    icon: 'el-icon-document',
  },
  {
    name: 'url',
    label: 'Endpoint',
    icon: 'el-icon-document',
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
