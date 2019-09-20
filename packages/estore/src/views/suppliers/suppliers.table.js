// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'created_at',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'Supplier ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Supplier Name',
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
    icon: 'el-icon-circle-check',
    type: 'select',
    values: [
      {
        label: 'Available',
        value: true
      },
      {
        label: 'Unavailable',
        value: false
      }
    ]
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created_at',
    label: 'Date Created',
    format: 'date',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'id',
    label: 'Supplier ID',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Supplier Name',
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
    format: value => {
      return value === 'active' ? 'Available' : 'Unavailable'
    },
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
  // processor: new ApiProcessor({ component, path: 'suppliers' }),
  processor: new MockProcessor({
    component,
    mockFrom: 'suppliers',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'suppliers'
})
