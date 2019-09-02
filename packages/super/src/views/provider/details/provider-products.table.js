const TABLE_FILTERS = []

const TABLE_COLUMNS = [
  {
    name: 'name',
    label: 'Product Name',
    icon: 'el-icon-document',
    width: 200,
  },
  {
    name: 'defaultVersion',
    label: 'Default Version',
    icon: 'el-icon-document',
    width: 200,
  },
]

export default {
  processor: null,
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
