const tablesConfig = {
  singleProductsTable: {
    filters: [
      {
        attribute: 'product',
        type: 'string',
        icon: 'el-icon-tickets',
      },
      {
        attribute: 'number',
        type: 'numeric',
        icon: 'el-icon-tickets',
      },
      {
        attribute: 'amount',
        type: 'numeric',
        icon: 'el-icon-tickets',
      },
    ],
    columns: [
      {
        name: 'product',
        label: 'Product',
      },
      {
        name: 'number',
        label: 'Number',
        width: 120,
      },
      {
        name: 'amount',
        label: 'Amount',
        format: 'dollar',
        width: 120,
      },
    ],
  },
  subscriptionsTable: {
    filters: [{
      attribute: 'product',
      type: 'string',
      icon: 'el-icon-tickets',
    },
    {
      attribute: 'number',
      type: 'numeric',
      icon: 'el-icon-tickets',
    },
    {
      attribute: 'mostPopularPricingPlan',
      type: 'string',
      icon: 'el-icon-tickets',
    }],
    columns: [{
      name: 'product',
      label: 'Product',
    },
    {
      name: 'number',
      label: 'Number',
      width: 120,
    },
    {
      name: 'mostPopularPricingPlan',
      label: 'Most Popular Pricing Plan',
    }],
  },
}

export default {
  tablesConfig,
}
