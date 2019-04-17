const dateFormat = 'DD/MM/YYYY hh:mm A'

const detailsTableConfig = {
  filters: [{
    attribute: 'dateCreated',
    icon: 'el-icon-tickets',
    type: 'date',
  },
  {
    attribute: 'type',
    type: 'string',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'amount',
    type: 'numeric',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'fee',
    type: 'numeric',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'net',
    type: 'numeric',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'statementDescriptor',
    type: 'string',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'orderId',
    type: 'string',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'status',
    type: 'string',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'dateFinalised',
    icon: 'el-icon-tickets',
    type: 'date',
  },
  {
    attribute: 'paymentMethod',
    type: 'string',
    icon: 'el-icon-tickets',
  }],
  columns: [{
    name: 'dateCreated',
    label: 'Date Created',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'type',
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
  },
  {
    name: 'fee',
    label: 'Fee',
    format: 'dollar',
  },
  {
    name: 'net',
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
            case 'Pending': return { color: '#fbb241' }
            case 'Successful': return { color: '#29d737' }
            case 'Failed': return { color: '#fc7168' }
            case 'Refunded': return { color: '#fc7168' }
            default: return {}
          }
        },
        badge(val) {
          switch (val) {
            case 'Pending': return {
              name: 'el-icon-time',
              pos: 'left',
            }
            case 'Successful': return {
              name: 'el-icon-check',
              pos: 'left',
            }
            case 'Failed': return {
              name: 'el-icon-close',
              pos: 'left',
            }
            case 'Refunded': return {
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
    name: 'dateFinalised',
    label: 'Date Finalised',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'paymentMethod',
    label: 'Payment Method',
  }],
}

export default {
  detailsTableConfig,
}
