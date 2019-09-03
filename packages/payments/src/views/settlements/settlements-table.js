import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'amount.subtotal',
    label: 'NET',
    type: 'numeric',
    icon: 'el-icon-money',
  },
  {
    attribute: 'fundingSource',
    label: 'Settlement Account',
    type: 'string',
    icon: 'el-icon-house',
  },
  {
    attribute: 'id',
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
        label: 'Processing',
        value: 'pending',
      },
      {
        label: 'Failed',
        value: 'failed',
      },
    ],
  },
  {
    attribute: 'dateFinalised',
    type: 'date',
    icon: 'el-icon-date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    width: 140,
    format: 'dateTime',
  },
  {
    name: 'amount.subtotal',
    label: 'NET',
    icon: 'el-icon-money',
    format: 'dollar',
    width: 70,
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
    name: 'fundingSource.pan',
    label: 'Settlement Account',
    icon: 'el-icon-house',
    width: 100,
    format: 'account',
  },
  {
    name: 'orderId',
    label: 'Order ID',
    icon: 'el-icon-document',
    width: 70,
    type: 'string',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-circle-check',
    format: 'capital',
    width: 100,
    component: {
      props: {
        styleObj(val) {
          switch (val) {
            case 'pending': return { color: '#fbb241' }
            case 'completed': return { color: '#29d737' }
            case 'failed': return { color: '#fc7168' }
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
            case 'finalised': return {
              name: 'el-icon-check',
              pos: 'left',
            }
            case 'failed': return {
              name: 'el-icon-close',
              pos: 'left',
            }
            default: return {}
          }
        },
        value(_, row) {
          return row.status === 'pending' ? 'Processing' : row.status
        }
      },
    },
  },
  {
    name: 'completedAt',
    label: 'Date Finalised',
    icon: 'el-icon-date',
    width: 100,
    format: 'dateTime',
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
            value: 'settlement',
          },
        ],
      },
      query: {
        sort: { createdAt: { order: 'desc' } }
      }
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
