import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'name',
    label: 'Product Name',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'price',
    label: 'Amount',
    icon: 'el-icon-document',
    type: 'numeric',
  },
  {
    attribute: 'startAt',
    label: 'Effective Start Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'endAt',
    label: 'End Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    format: 'dateTime',
  },
  {
    name: 'name',
    label: 'Product Name',
    width: 300,
  },
  {
    name: 'price.total',
    label: 'Amount',
    format: 'dollar',
  },
  {
    name: 'startAt',
    label: 'Effective Start Date',
    format: 'dayMonth',
  },
  {
    name: 'endAt',
    label: 'End Date',
    format: 'date',
  },
  {
    name: 'status',
    label: 'Status',
    format: 'capital',
    component: {
      is: 'cell-activity',
    },
  },
]

export default function(component){
  return {
    processor: new ElasticProcessor({
      component,
      index: 'single-products',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
