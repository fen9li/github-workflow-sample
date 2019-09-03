// import StaticProcessor from '@lib/processors/static-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = []

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY'],
    },
    width: 200,
  },
  {
    name: 'id',
    label: 'Role Id',
    icon: 'el-icon-document',
    width: 200,
  },
  {
    name: 'name',
    label: 'Role Name',
    icon: 'el-icon-document',
    width: 200,
  },
]

export default component => ({
  processor: new MockProcessor({
    component,
    mockFrom: 'product-roles-tab',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
})
