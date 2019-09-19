// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'created_at',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-document',
  },
  {
    attribute: 'id',
    label: 'Provider ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Provider Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'updated_at',
    label: 'Last updated',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'active',
    label: 'Status',
    icon: 'el-icon-document',
    type: 'select',
    values: [
      {
        label: 'Active',
        value: true
      },
      {
        label: 'Inactive',
        value: false
      }
    ]
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created_at',
    label: 'Date Created',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'id',
    label: 'Provider ID',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Provider Name',
    icon: 'el-icon-document',
  },
  {
    name: 'updated_at',
    label: 'Last Updated',
    format: 'dateTime',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'active',
    icon: 'el-icon-document',
    label: 'Status',
    format: 'capital',
    width: 90,
    component: {
      props: {
        styleObj(_, row) {
          return row.active ? { color: '#29d737' } : { color: '#fc1e1e' }
        },
        badge(_, row) {
          return row.active ? { name: 'el-icon-check', pos: 'left' } : { name: 'el-icon-close', pos: 'left' }
        },
        value(_, row) {
          return row.active ? 'active' : 'inactive'
        }
      },
    },
  }
]

export default component => ({
  // processor: new ApiProcessor({ component, path: 'providers' }),
  processor: new MockProcessor({
    component,
    mockFrom: 'providers',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'providers'
})
