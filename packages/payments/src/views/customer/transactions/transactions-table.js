import ElasticProcessor from '@lib/processors/elastic-processor'
import capitalize from 'lodash/capitalize'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'type',
    label: 'Type',
    type: 'select',
    icon: 'el-icon-price-tag',
    values: [
      {
        label: 'Recurrring',
        value: 'recurring',
      },
      {
        label: 'One Off',
        value: 'one_off',
      },
    ]
  },
  {
    attribute: 'amount',
    type: 'numeric',
    icon: 'el-icon-money',
  },
  {
    attribute: 'orderDescription',
    label: 'Description',
    type: 'string',
    icon: 'el-icon-data-board',
  },
  {
    attribute: 'orderId',
    label: 'Order ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-circle-check',
    values: [
      {
        label: 'Completed',
        value: 'completed',
      },
      {
        label: 'Finalised',
        value: 'finalised',
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
    label: 'Date',
    icon: 'el-icon-date',
    format: 'dateTime',
  },
  {
    name: 'type',
    icon: 'el-icon-price-tag',
    format: 'capital',
    component: {
      props: {
        format(val, row) {
          return val.split('_').map(item => capitalize(item)).join(' ')
        }
      }
    }
  },
  {
    name: 'amount.total',
    label: 'Amount',
    icon: 'el-icon-money',
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
    name: 'orderDescription',
    label: 'Description',
    icon: 'el-icon-data-board',
  },
  {
    name: 'orderId',
    label: 'Order ID',
    icon: 'el-icon-document',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-circle-check',
    format: 'capital',
    width: 120,
    component: {
      props: {
        styleObj(_, row) {
          switch (row.status) {
            case 'pending': return { color: '#fbb241' }
            case 'completed': return { color: '#29d737' }
            case 'failed': return { color: '#fc7168' }
            case 'refunded': return { color: '#fc7168' }
            case 'finalised': return { color: '#29d737' }
            default: return {}
          }
        },
        badge(_, row) {
          switch (row.status) {
            case 'pending': return {
              name: 'el-icon-time',
              pos: 'left',
            }
            case 'completed': return {
              name: 'el-icon-check',
              pos: 'left',
            }
            case 'finalised': return {
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
        value: (_, row) => {
          return row.status === 'finalised' ? 'completed' : row.status
        }
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
            value: component.id,
          },
        ],
      },
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
