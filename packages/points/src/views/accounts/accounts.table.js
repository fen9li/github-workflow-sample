import ApiProcessor from '@lib/processors/api-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'Account ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'providerId',
    label: 'Provider ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'providerName',
    label: 'Provider Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'updatedAt',
    label: 'Last Updated',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [{
      label: 'Active',
      value: 'active',
    }, {
      label: 'Inactive',
      value: 'inactive',
    }, ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    format: 'dateTime',
    icon: 'el-icon-document',
    sortable: false,
    width: 100,
  },
  {
    name: 'id',
    label: 'Account ID',
    icon: 'el-icon-document',
  },
  {
    name: 'providerId',
    label: 'Provider ID',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'providerName',
    label: 'Provider Name',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'updatedAt',
    label: 'Last Updated',
    icon: 'el-icon-document',
    width: 160,
  },
  {
    name: 'provider',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      props: {
        allowEmpty: true,
        styleObj(val) {
          switch (val) {
            case 'active':
              return { color: '#29d737' }
            case 'inactive':
              return { color: '#fc1e1e' }
            default:
              return {}
          }
        },
        badge: val => {
          switch (val) {
            case 'active':
              return { name: 'el-icon-check', pos: 'left' }
            case 'inactive':
              return { name: 'el-icon-close', pos: 'left' }
            default:
              return {}
          }
        },
      },
    },
  },
]

export default component => ({
  processor: new ApiProcessor({
    component,
    path: 'accounts',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'users'
})
