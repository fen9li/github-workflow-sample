import ApiProcessor from '@lib/processors/api-processor'

const TABLE_FILTERS = [
  {
    attribute: 'action',
    label: 'Action',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'updated_at',
    label: 'Date',
    type: 'date',
    icon: 'el-icon-date',
  },
]

const TABLE_COLUMNS = [
  {
    name: '%username-field-missing%',
    label: 'Username',
    icon: 'el-icon-document',
    format: () => '',
  },
  {
    name: 'action',
    label: 'Action',
    icon: 'el-icon-document',
    format: (value, row) => `${row.action} ${row.type}`,
  },
  {
    name: '%note-field-missing%',
    label: 'Note',
    icon: 'el-icon-document',
    format: () => '',
  },
  {
    name: 'updated_at',
    label: 'Date',
    icon: 'el-icon-date',
    format: 'dateTime',
  },
  { type: 'expand' },
]

export default component => ({
  processor: new ApiProcessor({
    path: 'userlogs',
    component,
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
})
