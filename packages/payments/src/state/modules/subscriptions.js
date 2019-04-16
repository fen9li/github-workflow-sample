const dateFormat = 'DD/MM/YYYY hh:mm A'

const columns = {
  startDate: {
    type: 'date',
    icon: 'el-icon-date',
    meta: {
      format: {
        type: 'date',
        form: dateFormat,
      },
    },
  },
  endDate: {
    type: 'date',
    icon: 'el-icon-date',
    meta: {
      format: {
        type: 'date',
        form: dateFormat,
      },
    },
  },
  productGroupName: {
    type: 'string',
    icon: 'el-icon-document',
    label: 'Subscription Prod Group',
  },
  productName: {
    type: 'string',
    icon: 'el-icon-document',
    label: 'Product Name',
  },
  currentAmount: {
    type: 'numeric',
    icon: 'el-icon-star-off',
    label: 'Plan',
    meta: {
      format: {
        type: 'dollar',
      },
      color: {
        negative: '#fc7168',
      },
    },
  },
  currentInterval: {
    type: 'string',
    icon: 'el-icon-document',
    label: 'Billing Interval',
  },
  nextBillingDate: {
    type: 'date',
    icon: 'el-icon-date',
    meta: {
      format: {
        type: 'date',
        form: dateFormat,
      },
    },
  },
  outstandingBalance: {
    type: 'numeric',
    icon: 'el-icon-star-off',
    label: 'Balance',
    meta: {
      format: {
        type: 'dollar',
      },
      color: {
        negative: '#fc7168',
      },
    },
  },
  status: {
    type: 'select',
    icon: 'el-icon-document',
    meta: {
      color: {
        'is:Active': '#29d737',
        'is:Inactive': '#ccc',
      },
      badge: {
        'is:Inactive': {
          name: 'el-icon-warning',
          pos: 'left',
        },
        'is:Active': {
          name: 'el-icon-success',
          pos: 'left',
        },
      },
    },
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
  actions: {
    type: 'string',
    icon: 'el-icon-document',
    label: 'Buttons',
  },
  customerExternalId: {
    type: 'string',
    label: 'Customer Id',
    icon: 'el-icon-document',
  },
  customerEmailAddress: {
    type: 'string',
    label: 'Customer Email',
    icon: 'el-icon-document',
  },
}

export const state = {}

export const getters = {
  tableInfo: () => ({ columns }),
}

export const actions = {}
