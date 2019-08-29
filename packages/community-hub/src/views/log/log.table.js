import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'username',
    label: 'Username',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'action',
    label: 'Action',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'created_at',
    label: 'Date',
    type: 'date',
    icon: 'el-icon-date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'username',
    label: 'Username',
    icon: 'el-icon-document',
  },
  {
    name: 'action',
    label: 'Action',
    icon: 'el-icon-document',
  },
  {
    name: 'created_at',
    label: 'Date',
    icon: 'el-icon-date',
    format: 'dateTime',
  },
  { type: 'expand' },
]

export default function(context) {
  return {
    processor: new MockProcessor({
      component: context,
      mockFrom: 'log',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
    tableName: 'log'
  }
}
