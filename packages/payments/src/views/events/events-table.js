const TABLE_FILTERS = [
  {
    attribute: 'created',
    label: 'Date',
    type: 'date',
    icon: 'el-icon-document',
  },
  {
    attribute: 'description',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'id',
    label: 'ID',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created',
    label: 'Date Created',
    icon: 'el-icon-document',
    format: 'dateTime',
    width: 160,
  },
  {
    name: 'description',
    label: 'Description',
    icon: 'el-icon-document',
    width: 400,
  },
  {
    name: 'id',
    label: 'ID',
    icon: 'el-icon-document',
    width: 180,
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
