// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [{
      label: 'Enabled',
      value: true,
    }, {
      label: 'Disabled',
      value: false,
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
  },
  {
    name: 'familyName',
    label: 'Last Name',
    icon: 'el-icon-document',
  },
  {
    name: 'email',
    icon: 'el-icon-document',
  },
  {
    name: 'provider',
    icon: 'el-icon-document',
  },
  {
    name: 'products',
    icon: 'el-icon-document',
  },
  {
    name: '2fa',
    icon: 'el-icon-document',
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
  // processor: new ApiProcessor({
  //   component,
  //   path: '/users',
  // }),
  processor: new MockProcessor({
    component,
    mockFrom: 'users',

  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'users'
})
