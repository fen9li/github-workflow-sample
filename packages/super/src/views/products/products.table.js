import ApiProcessor from '@lib/processors/api-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Сreated',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 160,
  },
]

export default function(component) {
  return {
    processor: new ApiProcessor({
      component,
      path: '/products',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
