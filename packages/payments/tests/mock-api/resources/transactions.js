class Transactions {
  constructor() {
    this.data = {
      pagination: {
        page: 1,
        items_per_page: 100,
        page_count: 3,
        total_items: 3,
        prev_page: false,
        next_page: true,
      },
      columns: {
        date: {
          type: 'date',
          icon: 'el-icon-date',
          meta: {
            format: {
              type: 'date',
              form: 'DD/MM/YYYY hh:mm A',
            },
          },
        },
        type: {
          type: 'string',
          icon: 'el-icon-menu',
          meta: {
            color: {
              'is:Refund': '#fc7168',
            },
          },
        },
        amount: {
          type: 'numeric',
          icon: 'el-icon-star-off',
          meta: {
            format: {
              type: 'dollar',
            },
            color: {
              negative: '#fc7168',
            },
          },
        },
        fee: {
          type: 'numeric',
          icon: 'el-icon-tickets',
          meta: {
            format: {
              type: 'dollar',
            },
          },
        },
        net: {
          type: 'numeric',
          icon: 'el-icon-tickets',
          meta: {
            format: {
              type: 'dollar',
            },
          },
        },
        statementDescriptor: {
          type: 'string',
          icon: 'el-icon-tickets',
        },
        orderId: {
          type: 'string',
          icon: 'el-icon-document',
        },
        status: {
          type: 'string',
          icon: 'el-icon-document',
          meta: {
            color: {
              'is:Pending': '#fbb241',
              'is:Finalised': '#29d737',
              'is:Failed': '#fc7168',
            },
            badge: {
              'is:Pending': {
                name: 'el-icon-time',
                pos: 'left',
              },
              'is:Finalised': {
                name: 'el-icon-check',
                pos: 'left',
              },
              'is:Failed': {
                name: 'el-icon-close',
                pos: 'left',
              },
            },
          },
        },
        dateFinalized: {
          type: 'date',
          icon: 'el-icon-document',
          meta: {
            format: {
              type: 'date',
              form: 'DD/MM/YYYY hh:mm A',
            },
          },
        },
        paymentSource: {
          type: 'string',
          icon: 'el-icon-document',
        },
        customerId: {
          type: 'string',
          icon: 'el-icon-document',
        },
        customerEmail: {
          type: 'string',
          icon: 'el-icon-document',
        },
      },
      data: [
        {
          date: '2018-10-15T12:40:31.965Z',
          type: 'Payment',
          amount: '105.43',
          fee: '5.55',
          net: '100',
          statementDescriptor: 'INV101989',
          orderId: 'ORD1239',
          status: 'Failed',
          dateFinalized: '',
          paymentSource: '**** 7326 MasterCard',
          customerId: '102467',
          customerEmail: 'customer@email.com.au',
        },
        {
          date: '2018-10-15T12:40:31.965Z',
          type: 'Payment',
          amount: '105.43',
          fee: '5.55',
          net: '100',
          statementDescriptor: 'INV101989',
          orderId: 'ORD1240',
          status: 'Pending',
          dateFinalized: '',
          paymentSource: '**** 7326 MasterCard',
          customerId: '102467',
          customerEmail: 'customer@email.com.au',
        },
        {
          date: '2018-10-15T12:40:31.965Z',
          type: 'Refund',
          amount: '-105.43',
          fee: '0',
          net: '-30',
          statementDescriptor: 'Refund101935',
          orderId: 'ORD1241',
          status: 'Finalised',
          dateFinalized: '2018-10-15T12:40:31.965Z',
          paymentSource: '**** 7326 MasterCard',
          customerId: '102467',
          customerEmail: 'customer@email.com.au',
        },
      ],
    }
  }

  getAllTransactions() {
    return this.data
  }
}

module.exports = new Transactions()
