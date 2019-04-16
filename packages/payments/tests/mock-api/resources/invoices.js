class Invoices {
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
        name: {
          type: 'numeric',
          icon: 'el-icon-tickets',
        },
        invoiceNumber: {
          type: 'string',
          icon: 'el-icon-sold-out',
        },
        customer: {
          type: 'string',
          icon: 'el-icon-mobile-phone',
        },
        paymentDue: {
          type: 'date',
          icon: 'el-icon-date',
        },
        created: {
          type: 'datetime',
          icon: 'el-icon-date',
        },
      },
      data: [
        {
          name: 120,
          invoiceNumber: 'F9287',
          customer: 'litzy_schumm@yahoo.com',
          paymentDue: '12/12/2018',
          created: '12/12/2018 12:23',
        },
        {
          name: 120,
          invoiceNumber: 'F9287',
          customer: 'litzy_schumm@yahoo.com',
          paymentDue: '12/12/2018',
          created: '12/12/2018 12:23',
        },
        {
          name: 120,
          invoiceNumber: 'F9287',
          customer: 'litzy_schumm@yahoo.com',
          paymentDue: '12/12/2018',
          created: '12/12/2018 12:23',
        },
        {
          name: 120,
          invoiceNumber: 'F9287',
          customer: 'litzy_schumm@yahoo.com',
          paymentDue: '12/12/2018',
          created: '12/12/2018 12:23',
        },
      ],
    }
  }

  getAllInvoices() {
    return this.data
  }
}

module.exports = new Invoices()
