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
    attribute: 'userEmail',
    label: 'User Email',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'eventId',
    label: 'ID',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created',
    label: 'Date',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'description',
    label: 'Description',
    icon: 'el-icon-document',
  },
  {
    name: 'userEmail',
    label: 'User Email',
    icon: 'el-icon-document',
  },
  {
    name: 'eventId',
    label: 'ID',
    icon: 'el-icon-document',
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
