import ApiProcessor from '@lib/processors/api-processor'
// import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'Product ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Product Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'description',
    label: 'Product Description',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    label: 'Status',
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
    label: 'Product ID',
    type: 'string',
    icon: 'el-icon-document',
    width: 80,
  },
  {
    name: 'name',
    label: 'Product Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'description',
    label: 'Product Description',
    type: 'string',
    icon: 'el-icon-document',
    width: 260,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'string',
    icon: 'el-icon-document',
    format: {
      name: 'capital',
    },
    width: 80,
    component: {
      props: {
        styleObj(_, row) {
          switch (row.status) {
            case 'active':
              return { color: '#29d737' }
            case 'inactive':
              return { color: '#fc7168' }
            default:
              return {}
          }
        },
        badge(_, row) {
          switch (row.status) {
            case 'active':
              return {
                name: 'el-icon-check',
                pos: 'left',
              }
            case 'inactive':
              return {
                name: 'el-icon-close',
                pos: 'left',
              }
            default:
              return {}
          }
        },
      },
    },
  },
]

export default function(component) {
  return {
    processor: new ApiProcessor({
      component,
      path: 'products',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
