class Settlements {
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
        accountTransfered: {
          type: 'string',
          icon: 'el-icon-tickets',
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
        dateFinalised: {
          type: 'date',
          icon: 'el-icon-document',
          meta: {
            format: {
              type: 'date',
              form: 'DD/MM/YYYY hh:mm A',
            },
          },
        },
      },
      data: [
        {
          date: '12/04/2077',
          amount: '1820',
          fee: '0.9',
          net: '1804',
          statementDescriptor: 'Full fee',
          accountTransfered: '*** 245',
          status: 'Pending',
          dateFinalised: '10/02/2019 02:54 PM',
          id: 1,
        },
        {
          date: '11/04/2077',
          amount: '120',
          fee: '0.3',
          net: '119.5',
          statementDescriptor: 'Overseas',
          accountTransfered: '*** 112',
          status: 'Finalised',
          dateFinalised: '10/02/2019 02:54 PM',
          id: 2,
        },
        {
          date: '10/04/2077',
          amount: '300',
          fee: '12',
          net: '288',
          statementDescriptor: 'Earning less than $34,000 p.a. *',
          accountTransfered: '*** 413',
          status: 'Failed',
          dateFinalised: '10/02/2019 02:54 PM',
          id: 3,
        },
      ],
    }
  }

  getAllSettlements() {
    return this.data
  }
}

module.exports = new Settlements()
