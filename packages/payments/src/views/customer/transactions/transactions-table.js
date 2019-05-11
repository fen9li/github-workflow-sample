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
    attribute: 'feeAmount',
    label: 'Fee',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'netAmount',
    label: 'NET',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'statementDescriptor',
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
  {
    attribute: 'completedAt',
    label: 'Date Finalised',
    type: 'date',
    icon: 'el-icon-document',
  },
  {
    attribute: 'paymentSource',
    type: 'string',
    icon: 'el-icon-document',
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
    name: 'feeAmount',
    label: 'Fee',
    icon: 'el-icon-document',
    format: 'dollar',
    width: 100,
  },
  {
    name: 'netAmount',
    label: 'NET',
    icon: 'el-icon-document',
    format: 'dollar',
    width: 100,
  },
  {
    name: 'statementDescriptor',
    label: 'Statement Descriptor',
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
            case 'pending': return { color: '#fbb241' }
            case 'finalised': return { color: '#29d737' }
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
      },
    },
  },
  {
    name: 'completedAt',
    label: 'Date Finalised',
    icon: 'el-icon-document',
    format: 'dayMonthYear',
  },
  {
    name: 'paymentSource',
    label: 'Payment Source',
    icon: 'el-icon-document',
  },
  // {
  //   name: 'customerId',
  //   label: 'Customer ID',
  //   icon: 'el-icon-document',
  // },
  // {
  //   name: 'customerEmailAddress',
  //   label: 'Customer Email',
  //   icon: 'el-icon-document',
  // },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
