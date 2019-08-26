import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'startAt',
    label: 'Start Date',
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
    attribute: 'productName',
    type: 'string',
    icon: 'el-icon-goods',
  },
  {
    attribute: 'currentInterval',
    label: 'Frequency',
    type: 'select',
    icon: 'el-icon-refresh-right',
    values: [
      {
        label: 'Monthly',
        value: 'Monthly',
      },
      {
        label: 'Quarterly',
        value: 'Quarterly',
      },
      {
        label: 'Yearly',
        value: 'Yearly',
      },
    ],
  },
  {
    attribute: 'nextBillingDate',
    icon: 'el-icon-date',
    type: 'date',
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
    icon: 'el-icon-circle-check',
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
    icon: 'el-icon-date',
    label: 'Start Date',
    format: 'date',
    width: 120,
  },
  {
    name: 'endAt',
    label: 'End Date',
    icon: 'el-icon-date',
    format: {
      name: 'dayMonthYear',
    },
    width: 120,
  },
  {
    name: 'productName',
    label: 'Product Name',
    icon: 'el-icon-goods',
  },
  {
    name: 'currentInterval',
    label: 'Frequency',
    icon: 'el-icon-refresh-right',
    width: 120,
    format: 'capital',
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
  },
  {
    name: 'nextBilledAt',
    label: 'Next Billing Date',
    icon: 'el-icon-date',
    format: 'date',
    width: 140,
  },
  {
    name: 'outstandingBalance.total',
    label: 'Amount Owing',
    icon: 'el-icon-money',
    format: 'dollar',
    overflowTooltip: false,
    component: {
      props: {
        styleObj(val) {
          if (val > 0) {
            return { color: '#fc7168' }
          }
          return {}
        },
      },
    },
    width: 140,
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-circle-check',
    width: 100,
    format: {
      name: 'capital',
    },
    component: {
      is: 'cell-activity',
    },
  },
]

export default function(component) {
  return {
    processor: new ElasticProcessor({
      component,
      index: 'subscriptions',
      staticQuery: {
        filters: [
          {
            attribute: 'customerId',
            value: component.id,
          },
        ],
      },
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
