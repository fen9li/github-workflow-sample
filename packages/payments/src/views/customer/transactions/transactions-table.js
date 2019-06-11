import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'action',
    label: 'Type',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'amount',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'statementDescriptor',
    label: 'Statement Description',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'orderId',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Finalised',
        value: 'Finalised',
      },
      {
        label: 'Pending',
        value: 'Pending',
      },
      {
        label: 'Refunded',
        value: 'Refunded',
      },
      {
        label: 'Failed',
        value: 'Failed',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date',
    icon: 'el-icon-document',
    format: 'dayMonthYear',
  },
  {
    name: 'action',
    label: 'Type',
    icon: 'el-icon-document',
    format: 'capital',
  },
  {
    name: 'amount',
    label: 'Amount',
    icon: 'el-icon-document',
    format: 'dollar',
    width: 100,
    component: {
      props: {
        styleObj(val) {
          if (val < 0) {
            return { color: '#fc7168' }
          }
          return {}
        },
      },
    },
  },
  {
    name: 'statementDescriptor',
    label: 'Description',
    icon: 'el-icon-document',
  },
  {
    name: 'orderId',
    label: 'Order ID',
    icon: 'el-icon-document',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      props: {
        styleObj(val) {
          switch (val) {
            case 'pending':
              return { color: '#fbb241' }
            case 'finalised':
              return { color: '#29d737' }
            case 'failed':
              return { color: '#fc7168' }
            case 'refunded':
              return { color: '#fc7168' }
            default:
              return {}
          }
        },
        badge(val) {
          switch (val) {
            case 'pending':
              return {
                name: 'el-icon-time',
                pos: 'left',
              }
            case 'finalised':
              return {
                name: 'el-icon-check',
                pos: 'left',
              }
            case 'failed':
              return {
                name: 'el-icon-close',
                pos: 'left',
              }
            case 'refunded':
              return {
                name: 'el-icon-refresh',
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
    processor: new ElasticProcessor({
      component,
      index: 'transactions',
      staticQuery: {
        filters: [
          {
            attribute: 'customerId',
            value: component.customerId,
          },
        ],
      },
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
