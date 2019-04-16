class Disputes {
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
        amount: {
          type: 'numeric',
          icon: 'el-icon-star-off',
        },
        reason: {
          type: 'string',
          icon: 'el-icon-tickets',
        },
        customer: {
          type: 'string',
          icon: 'el-icon-tickets',
        },
        sourceType: {
          type: 'string',
          icon: 'el-icon-document',
        },
        disputedOn: {
          type: 'date',
          icon: 'el-icon-date',
        },
      },
      data: [
        {
          amount: 80,
          reason: 'Fraudulent',
          customer: 'Oscar Hopkins',
          sourceType: '**** 7326 MasterCard',
          disputedOn: '12/12/2018 12:23',
        },
        {
          amount: 2,
          reason: 'Unrecognized',
          customer: 'Joaquin Phoenix',
          sourceType: '**** 5426 Visa',
          disputedOn: '3/12/2077 00:00',
        },
        {
          amount: 7,
          reason: 'Unrecognized',
          customer: 'Ralph Howell',
          sourceType: '**** 5648 Visa',
          disputedOn: '2/12/2077 12:21',
        },
      ],
    }
  }

  getAllDisputes() {
    return this.data
  }
}

module.exports = new Disputes()
