// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'


const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'id',
    label: 'Role ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Role Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'product',
    label: 'Product Name',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    type: 'string',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 100,
  },
  {
    name: 'id',
    label: 'Role ID',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Role Name',
    icon: 'el-icon-document',
  },
  {
    name: 'product',
    label: 'Product Name',
    icon: 'el-icon-document',
    format(value) {
      return value.join(', ')
    }
  },
]

export default function(component) {
  return {
    processor: new MockProcessor({
      component,
      mockFrom: 'roles',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
