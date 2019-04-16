const TABLE_FILTERS = [
  {
    attribute: 'created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'amount',
    type: 'numeric',
    icon: 'el-icon-star-off',
  },
  {
    attribute: 'fee',
    type: 'numeric',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'netAmount',
    type: 'numeric',
    icon: 'el-icon-tickets',
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
    attribute: 'dateFinalised',
    type: 'date',
    icon: 'el-icon-document',
  },
  {
    attribute: 'paymentSource',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'customerEmailAddress',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created',
    label: 'Date created',
    icon: 'el-icon-document',
    format: 'dateTime',
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
    name: 'fee',
    label: 'Fee',
    icon: 'el-icon-document',
    format: 'dollar',
    width: 100,
  },
  {
    name: 'netAmount',
    label: 'Net',
    icon: 'el-icon-document',
    format: 'dollar',
    width: 100,
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
    component: {
      props: {
        styleObj(val) {
          switch (val) {
            case 'Pending': return { color: '#fbb241' }
            case 'Finalised': return { color: '#29d737' }
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
            case 'Finalised': return {
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
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'paymentSource',
    label: 'Payment Source',
    icon: 'el-icon-document',
  },
  {
    name: 'customerIntegrationId',
    label: 'Customer ID',
    icon: 'el-icon-document',
  },
  {
    name: 'customerEmailAddress',
    label: 'Customer Email',
    icon: 'el-icon-document',
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
