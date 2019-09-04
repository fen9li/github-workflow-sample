import ApiProcessor from '@lib/processors/api-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'id',
    label: 'Provider ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Provider Name',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'twoFactor',
    label: 'Enforce 2FA',
    type: 'boolean',
    icon: 'el-icon-document',
  },
  {
    attribute: 'timezone',
    name: 'Timezone',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    name: 'Status',
    type: 'string',
    icon: 'el-icon-document',
  }
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
  },
  {
    name: 'id',
    label: 'Provider ID',
    sortable: false,
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Provider Name',
    icon: 'el-icon-document',
  },
  {
    name: 'twoFactor',
    label: 'Enforce 2FA',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'timezone',
    label: 'Timezone',
    icon: 'el-icon-document',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      props: {
        styleObj(_, row) {
          switch (row.status) {
            case 'active':
              return {
                color: '#36d544',
              }
            case 'inactive':
              return {
                color: '#e21d1f'
              }
            default: return {}
          }
        },
        badge(_, row) {
          switch (row.status) {
            case 'active':
              return {
                name: 'el-icon-check',
                pos: 'left'
              }
            case 'inactive':
              return {
                name: 'el-icon-close',
                pos: 'left'
              }
            default: return {}
          }
        }
      },
    },
    width: 100,
  },
]

export default function(context) {
  return {
    processor: new ApiProcessor({
      component: context,
      path: 'providers',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
    tableName: 'providers'
  }
}
