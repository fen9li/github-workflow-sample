import ApiProcessor from '@lib/processors/api-processor'

const TABLE_FILTERS = [
  {
    attribute: 'logo',
    label: 'Client Logo',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Client Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'feeds',
    label: 'Aggregator Feeds',
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
    name: 'logo',
    label: 'Client Logo',
    sortable: false,
    icon: 'el-icon-document',
    fixed: 'left',
    width: 100,
    component: {
      is: 'cell-image',
    },
    format(value) {
      return `${value}//-/preview/100x30/-/quality/best/`
    }
  },
  {
    name: 'name',
    label: 'Client Name',
    sortable: false,
    icon: 'el-icon-document',
  },
  {
    name: 'feeds',
    label: 'Aggregator Feeds',
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
    icon: 'el-icon-document',
    sortable: false,
  },
]

export default component => ({
  processor: new ApiProcessor({ component, path: 'catalogues' }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'catalogues'
})
