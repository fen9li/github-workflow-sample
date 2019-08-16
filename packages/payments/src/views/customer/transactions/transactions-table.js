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
    format: 'dateTime',
  },
  {
    name: 'type',
    icon: 'el-icon-document',
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
    name: 'orderDescription',
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
    icon: 'el-icon-document',
    format: 'capital',
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
