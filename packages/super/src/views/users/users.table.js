import ApiProcessor from '@lib/processors/api-processor'
// import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'User ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'givenName',
    label: 'First Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'familyName',
    label: 'Last Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'provider',
    label: 'Provider',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: '2fa',
    type: 'select',
    icon: 'el-icon-document',
    values: [{
      label: 'Yes',
      value: true,
    }, {
      label: 'No',
      value: false,
    }, ],
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [{
      label: 'Enabled',
      value: 'active',
    }, {
      label: 'Pending',
      value: 'pending',
    }, {
      label: 'Blocked',
      value: 'blocked',
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
    label: 'User ID',
    icon: 'el-icon-document',
  },
  {
    name: 'givenName',
    label: 'First Name',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'familyName',
    label: 'Last Name',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'email',
    icon: 'el-icon-document',
    width: 160,
  },
  {
    name: 'provider',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'products',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: '2fa',
    icon: 'el-icon-document',
    width: 80,
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
            case 'pending':
              return { color: '#fbb241' }
            case 'blocked':
              return { color: '#fc1e1e' }
            default:
              return {}
          }
        },
        badge: val => {
          switch (val) {
            case 'active':
              return { name: 'el-icon-check', pos: 'left' }
            case 'pending':
              return { name: 'el-icon-time', pos: 'left' }
            case 'blocked':
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
    path: 'users',
  }),
  // processor: new MockProcessor({
  //   component,
  //   mockFrom: 'users',
  // }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'users'
})
