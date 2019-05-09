const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date',
    format: 'dayMonthYear',
  },
  {
    name: 'action',
    label: 'Type',
    component: {
      props: {
        styleObj(val) {
          if (val === 'Refund') {
            return { color: '#fc7168' }
          }

          return {}
        },
      },
    },
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'dollar',
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
    name: 'feeAmount',
    label: 'Fee',
    format: 'dollar',
  },
  {
    name: 'netAmount',
    label: 'NET',
    format: 'dollar',
  },
  {
    name: 'statementDescriptor',
    label: 'Statement Descriptor',
  },
  {
    name: 'orderId',
    label: 'Order ID',
  },
  {
    name: 'status',
    label: 'Status',
    component: {
      props: {
        styleObj(val) {
          switch (val) {
            case 'pending': return { color: '#fbb241' }
            case 'finalised': return { color: '#29d737' }
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
      },
    },
  },
  {
    name: 'completedAt',
    label: 'Date Finalised',
    format: 'dayMonthYear',
  },
  {
    name: 'paymentSource',
    label: 'Payment Source',
  },
  {
    name: 'customerId',
    label: 'Customer ID',
  },
  {
    name: 'customerEmailAddress',
    label: 'Customer Email Address',
  },
]

export default {
  columns: TABLE_COLUMNS,
}
