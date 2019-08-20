import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'startAt',
    label: 'Start Date',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'endAt',
    label: 'End Date',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'customerFirstName',
    label: 'First Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'customerLastName',
    label: 'Last Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'productName',
    label: 'Product Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'currentInterval',
    label: 'Frequency',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Monthly',
        value: 'P1M',
      },
      {
        label: 'Quarterly',
        value: 'P3M',
      },
      {
        label: 'Yearly',
        value: 'P1Y',
      },
    ],
  },
  {
    attribute: 'outstandingBalance.total',
    label: 'Amount Owing',
    type: 'numeric',
    icon: 'el-icon-money',
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
    name: 'startAt',
    label: 'Start Date',
    icon: 'el-icon-date',
    format: 'date',
    width: 130,
  },
  {
    name: 'endAt',
    label: 'End Date',
    icon: 'el-icon-date',
    format: 'date',
    width: 130,
  },
  {
    name: 'customerFirstName',
    label: 'First Name',
    icon: 'el-icon-document',
    width: 140,
  },
  {
    name: 'customerLastName',
    label: 'Last Name',
    icon: 'el-icon-document',
    width: 140,
  },
  {
    name: 'productName',
    label: 'Product Name',
    icon: 'el-icon-document',
    width: 200,
  },
  {
    name: 'currentInterval',
    label: 'Frequency',
    format: 'capital',
    icon: 'el-icon-document',
    component: {
      props: {
        format(value) {
          switch (value) {
            case 'P1m': return 'Monthly'
            case 'P3m': return 'Quarterly'
            case 'P1y': return 'Yearly'
          }
        },
      },
    },
    width: 130,
  },
  {
    name: 'outstandingBalance.total',
    label: 'Amount Owing',
    icon: 'el-icon-money',
    format: 'dollar',
    component: {
      props: {
        styleObj(val) {
          return val > 0 ? { color: '#fc7168' } : {}
        },
      },
    },
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      is: 'cell-activity',
    },
    width: 100,
  },
]

export default function(component) {
  return {
    processor: new ElasticProcessor({
      component,
      index: 'subscriptions',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
