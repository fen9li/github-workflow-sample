class Customers {
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
          type: 'string',
          icon: 'el-icon-star-off',
        },
        email: {
          type: 'string',
          icon: 'el-icon-star-off',
        },
        card: {
          type: 'string',
          icon: 'el-icon-star-off',
        },
        created: {
          type: 'datetime',
          icon: 'el-icon-date',
        },
      },
      data: [
        {
          customer: 'Jacob L.',
          email: 'litzy_schumm@yahoo.com',
          card: '**** 7326 MasterCard',
          created: '12/12/2018 12:23',
        },
        {
          customer: 'Jacob L.',
          email: 'litzy_schumm@yahoo.com',
          card: '**** 7326 MasterCard',
          created: '12/12/2018 12:23',
        },
        {
          customer: 'Jacob L.',
          email: 'litzy_schumm@yahoo.com',
          card: '**** 7326 MasterCard',
          created: '12/12/2018 12:23',
        },
        {
          customer: 'Jacob L.',
          email: 'litzy_schumm@yahoo.com',
          card: '**** 7326 MasterCard',
          created: '12/12/2018 12:23',
        },
        {
          customer: 'Jacob L.',
          email: 'litzy_schumm@yahoo.com',
          card: '**** 7326 MasterCard',
          created: '12/12/2018 12:23',
        },
      ],
    }
  }

  getAllCustomers() {
    return this.data
  }
}

module.exports = new Customers()
