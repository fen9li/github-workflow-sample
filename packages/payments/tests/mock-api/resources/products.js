class Products {
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
        code: {
          type: 'numeric',
          icon: 'el-icon-tickets',
        },
        name: {
          type: 'string',
          icon: 'el-icon-tickets',
        },
        status: {
          type: 'numeric',
          icon: 'el-icon-star-off',
        },
        type: {
          type: 'relative',
          icon: 'el-icon-menu',
          values: ['Recurring', 'Once-off'],
        },
        billingType: {
          type: 'string',
          icon: 'el-icon-document',
        },
        pricing: {
          type: 'string',
          icon: 'el-icon-document',
        },
        created: {
          type: 'date',
          icon: 'el-icon-date',
        },
      },
      data: [
        {
          code: 'F001',
          name: 'Full Fee',
          status: 'Available',
          type: 'Once-off',
          billingType: 'Anniversary',
          pricing: '12 SKUs',
          created: '12/12/2018 12:23',
        },
        {
          code: 'F002',
          name: 'Full Fee',
          status: 'Available',
          type: 'Once-off',
          billingType: 'Anniversary',
          pricing: '55 SKUs',
          created: '12/12/2018 12:23',
        },
        {
          code: 'F007',
          name: 'Unpaid Parental Leave',
          status: 'Available',
          type: 'Once-off',
          billingType: 'Anniversary',
          pricing: '2 SKUs',
          created: '12/12/2018 12:23',
        },
      ],
    }
  }

  getAllProducts() {
    return this.data
  }
}

module.exports = new Products()
