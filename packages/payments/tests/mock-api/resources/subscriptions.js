class Subscriptions {
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
        customer: {
          type: 'numeric',
          icon: 'el-icon-tickets',
        },
        status: {
          type: 'numeric',
          icon: 'el-icon-tickets',
        },
        billing: {
          type: 'string',
          icon: 'el-icon-tickets',
        },
        invoiceNumber: {
          type: 'string',
          icon: 'el-icon-document',
        },
        created: {
          type: 'datetime',
          icon: 'el-icon-date',
        },
      },
      data: [
        {
          customer: 'litzy_schumm@yahoo.com',
          status: 'Available',
          billing: 'Invoice',
          invoiceNumber: 'Test Product 1',
          created: '12/12/2018 12:23',
        },
        {
          customer: 'litzy_schumm@yahoo.com',
          status: 'Available',
          billing: 'Invoice',
          invoiceNumber: 'Test Product 1',
          created: '12/12/2018 12:23',
        },
        {
          customer: 'litzy_schumm@yahoo.com',
          status: 'Available',
          billing: 'Invoice',
          invoiceNumber: 'Test Product 1',
          created: '12/12/2018 12:23',
        },
        {
          customer: 'litzy_schumm@yahoo.com',
          status: 'Available',
          billing: 'Invoice',
          invoiceNumber: 'Test Product 1',
          created: '12/12/2018 12:23',
        },
      ],
    }
  }

  getAllSubscriptions() {
    return this.data
  }
}

module.exports = new Subscriptions()
