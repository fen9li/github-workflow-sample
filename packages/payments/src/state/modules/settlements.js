const dateFormat = 'DD/MM/YYYY hh:mm A'

const columns = {
  created: {
    type: 'date',
    icon: 'el-icon-date',
    label: 'Date',
    meta: {
      format: {
        type: 'date',
        form: dateFormat,
      },
    },
  },
  accountTransferred: {
    type: 'numeric',
    icon: 'el-icon-tickets',
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
  externalId: {
    type: 'string',
    icon: 'el-icon-tickets',
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
  netAmount: {
    type: 'numeric',
    icon: 'el-icon-tickets',
    label: 'Net',
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
        form: dateFormat,
      },
    },
  },
  settlementDate: {
    type: 'date',
    icon: 'el-icon-document',
    meta: {
      format: {
        type: 'date',
        form: dateFormat,
      },
    },
  },
}

export const state = {}

export const getters = {
  tableInfo: () => ({ columns }),
}

export const actions = {}
