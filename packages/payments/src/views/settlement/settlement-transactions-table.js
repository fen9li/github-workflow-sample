const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 160,
  },
  {
    name: 'action',
    label: 'Type',
    width: 100,
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
    name: 'customerId',
    label: 'Customer ID',
    width: 120,
  },
  {
    name: 'firstName',
    label: 'First Name',
    width: 100,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    width: 100,
  },
  {
    name: 'description',
    label: 'Description',
    width: 160,
  },
  {
    name: 'crn',
    label: 'CRN',
    width: 100,
  },
  {
    name: 'orderId',
    label: 'Order ID',
    width: 100,
  },
  {
    name: 'status',
    label: 'Status',
    width: 120,
    component: {
      props: {
        styleObj(val) {
          switch (val) {
            case 'pending':
              return { color: '#fbb241' }
            case 'successfull':
              return { color: '#29d737' }
            case 'failed':
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
            case 'successfull':
              return {
                name: 'el-icon-check',
                pos: 'left',
              }
            case 'failed':
              return {
                name: 'el-icon-close',
                pos: 'left',
              }
            default:
              return {}
          }
        },
      },
    },
  },

  /* old fields
  // remove when API will work
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
    name: 'completedAt',
    label: 'Date Finalised',
    format: 'dayMonthYear',
  },
  {
    name: 'paymentSource',
    label: 'Payment Source',
  },
  {
    name: 'customerEmailAddress',
    label: 'Customer Email Address',
  },
  */
]

export default {
  columns: TABLE_COLUMNS,
}
