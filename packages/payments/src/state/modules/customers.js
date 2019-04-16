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
  integrationId: {
    type: 'string',
    icon: 'el-icon-menu',
    label: 'Customer ID',
  },
  firstName: {
    type: 'string',
    icon: 'el-icon-menu',
  },
  lastName: {
    type: 'string',
    icon: 'el-icon-menu',
  },
  email: {
    type: 'string',
    icon: 'el-icon-document',
  },
  mobile: {
    type: 'string',
    icon: 'el-icon-document',
  },
  address: {
    type: 'string',
    icon: 'el-icon-document',
  },
  status: {
    type: 'string',
    icon: 'el-icon-document',
    meta: {
      color: {
        'is:Active': '#29d737',
        'is:Inactive': '#d3d5d4',
      },
      badge: {
        'is:Active': {
          name: 'el-icon-circle-check',
          pos: 'left',
        },
        'is:Inactive': {
          name: 'el-icon-remove',
          pos: 'left',
        },
      },
    },
  },
}

const rowColor = {
  field: 'status',
  condition: { 'is:Inactive': '#d3d5d4' },
}

export const state = {}

export const getters = {
  tableInfo: () => ({ columns, rowColor }),
}

export const actions = {}
