import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 160,
  },
  {
    name: 'type',
    label: 'Type',
    icon: 'el-icon-price-tag',
    width: 140,
    format: 'capital',
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
    icon: 'el-icon-money',
    format: 'dollar',
    width: 100,
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
    name: 'amount.fees',
    label: 'Fee',
    icon: 'el-icon-money',
    format: 'dollar',
    width: 100,
  },
  {
    name: 'amount.subtotal',
    label: 'NET',
    icon: 'el-icon-money',
    format: 'dollar',
    width: 100,
  },
  {
    name: 'id',
    label: 'Transaction ID',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-circle-check',
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
            attribute: 'settlementId',
            value: component.id,
          },
        ],
      },
    }),
    columns: TABLE_COLUMNS,
  }
}
