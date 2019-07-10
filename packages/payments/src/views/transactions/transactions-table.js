import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'type',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'amount',
    type: 'numeric',
    icon: 'el-icon-star-off',
  },
  {
    attribute: 'customerId',
    label: 'Customer ID',
    type: 'string',
    icon: 'el-icon-document',
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
    attribute: 'statementDescriptor',
    label: 'Description',
    type: 'string',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'orderId',
    label: 'Customer ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Settled',
        value: 'settled',
      },
      {
        label: 'Pending',
        value: 'pending',
      },
      {
        label: 'Refunded',
        value: 'refunded',
      },
      {
        label: 'Failed',
        value: 'failed',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'type',
    label: 'Type',
    icon: 'el-icon-document',
    format: 'capital',
    width: 120,
    component: {
      props: {
        styleObj(val) {
          if (val === 'refund') {
            return { color: '#fc7168' }
          }

          return {}
        },
      },
    },
  },
  {
    name: 'amount.total',
    label: 'Amount',
    icon: 'el-icon-document',
    format: 'dollar',
    width: 120,
    component: {
      props: {
        styleObj(val, row) {
          if (val < 0 || row.type === 'refund') {
            return { color: '#fc7168' }
          }

          return {}
        },
        format(value, row) {
          return row.type === 'refund' ? `(${value})` : value
        },
      },
    },
  },
  {
    name: 'customerId',
    label: 'Customer ID',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'customerFirstName',
    label: 'First Name',
    icon: 'el-icon-document',
    width: 120,
    component: {
      props: {
        allowEmpty: true,
      },
    },
  },
  {
    name: 'customerLastName',
    label: 'Last Name',
    icon: 'el-icon-document',
    width: 120,
    component: {
      props: {
        allowEmpty: true,
      },
    },
  },
  {
    name: 'statementDescriptor',
    label: 'Description',
    icon: 'el-icon-document',
    width: 200,
  },
  {
    name: 'orderId',
    label: 'Order ID',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    width: 120,
    component: {
      props: {
        styleObj(val) {
          switch (val) {
            case 'pending': return { color: '#fbb241' }
            case 'completed': return { color: '#29d737' }
            case 'failed': return { color: '#fc7168' }
            case 'refunded': return { color: '#fc7168' }
            default: return {}
          }
        },
        badge(val) {
          switch (val) {
            case 'pending': return {
              name: 'el-icon-time',
              pos: 'left',
            }
            case 'completed': return {
              name: 'el-icon-check',
              pos: 'left',
            }
            case 'failed': return {
              name: 'el-icon-close',
              pos: 'left',
            }
            case 'refunded': return {
              name: 'el-icon-refresh',
              pos: 'left',
            }
            default: return {}
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
            attribute: 'type',
            comparison: 'not_eq',
            value: 'settlement',
          },
        ],
      },
    }),
    columns: TABLE_COLUMNS,
    filters: TABLE_FILTERS,
  }
}
