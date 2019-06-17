import ApiProcessor from '@lib/processors/api-processor'

const TABLE_FILTERS = [
  {
    attribute: 'name',
    label: 'Client',
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
    name: 'name',
    label: 'Client',
    sortable: false,
    icon: 'el-icon-document',
  },
  {
    name: 'feeds',
    label: 'Feeds',
    sortable: false,
    type: 'array',
    icon: 'el-icon-document',
    format: {
      name: 'join',
      params: ['name'],
    },
  },
  {
    name: 'updated_at',
    label: 'Last Updated',
    format: 'dateTime',
    sortable: false,
  },
]

export default function(component) {
  return {
    processor: new ApiProcessor({
      component,
      path: 'catalogues',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
