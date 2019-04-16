const dateFormat = 'DD/MM/YYYY hh:mm A'

const columns = {
  created: {
    type: 'date',
    icon: 'el-icon-date',
    meta: {
      format: {
        type: 'date',
        form: dateFormat,
      },
    },
  },
  externalId: {
    type: 'string',
    icon: 'el-icon-menu',
    label: 'User ID',
    meta: {
      color: {
        'is:Refund': '#fc7168',
      },
    },
  },
  name: {
    type: 'string',
    icon: 'el-icon-menu',
    meta: {
      color: {
        'is:Refund': '#fc7168',
      },
    },
  },
  email: {
    type: 'string',
    icon: 'el-icon-menu',
    meta: {
      color: {
        'is:Refund': '#fc7168',
      },
    },
  },
  role: {
    type: 'string',
    icon: 'el-icon-menu',
    meta: {
      color: {
        'is:Refund': '#fc7168',
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
}

export const state = {}

export const getters = {
  tableInfo: () => ({ columns }),
}

export const actions = {}
