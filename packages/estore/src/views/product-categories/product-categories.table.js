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
    attribute: 'name',
    label: 'Default Category Hierarchy Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'updated_at',
    label: 'Last updated',
    icon: 'el-icon-date',
    type: 'date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created_at',
    label: 'Date Created',
    format: 'dateTime',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'name',
    label: 'Default Category Hierarchy Name',
    icon: 'el-icon-document',
  },
  {
    name: 'updated_at',
    label: 'Last Updated',
    format: 'dateTime',
    icon: 'el-icon-document',
    width: 100,
  },
]

export default component => ({
  // processor: new ApiProcessor({ component, path: 'product-categories' }),
  processor: new MockProcessor({
    component,
    mockFrom: 'product-categories',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'product-categories'
})
