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
  name: {
    type: 'string',
    icon: 'el-icon-menu',
    label: 'Name of Product',
  },
  effectiveStart: {
    type: 'date',
    icon: 'el-icon-date',
    meta: {
      format: {
        type: 'date',
        form: dateFormat,
      },
    },
  },
  sunset: {
    type: 'date',
    icon: 'el-icon-date',
    meta: {
      format: {
        type: 'date',
        form: dateFormat,
      },
    },
  },
  pricingPlanCount: {
    type: 'numeric',
    icon: 'el-icon-star-off',
  },
  externalId: {
    type: 'string',
    icon: 'el-icon-menu',
    meta: {
      color: {
        'is:Refund': '#fc7168',
      },
    },
  },
  productGroupExternalId: {
    type: 'string',
    icon: 'el-icon-menu',
    meta: {
      color: {
        'is:Refund': '#fc7168',
      },
    },
  },
}

export const state = {}

export const getters = {
  tableInfo: () => ({ columns }),
}

export const actions = {}
