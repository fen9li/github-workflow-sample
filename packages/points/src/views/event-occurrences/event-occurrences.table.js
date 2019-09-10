// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'Occurrence ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'eventName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'type',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'value',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'providerName',
    label: 'Provider Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'accountId',
    label: 'Account ID',
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
    values: [
      {
        label: 'Approved',
        value: 'approved',
      },
      {
        label: 'Completed',
        value: 'completed',
      },
      {
        label: 'Failed',
        value: 'failed',
      },
      {
        label: 'Pending',
        value: 'pending',
      },
    ],
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
    label: 'Occurrence ID',
    icon: 'el-icon-document',
  },
  {
    name: 'eventName',
    label: 'Event Name',
    icon: 'el-icon-document',
  },
  {
    name: 'type',
    icon: 'el-icon-document',
    format: 'capital',
    width: 80,
  },
  {
    name: 'value',
    icon: 'el-icon-document',
    width: 80,
  },
  {
    name: 'providerName',
    label: 'Provider Name',
    icon: 'el-icon-document',
    width: 110,
  },
  {
    name: 'accountId',
    label: 'Account ID',
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
    name: 'status',
    icon: 'el-icon-document',
    format: 'capital',
    width: 110,
    component: {
      props: {
        allowEmpty: true,
        styleObj(val) {
          switch (val) {
            case 'approved':
              return { color: '#29d737' }
            case 'failed':
              return { color: '#fc1e1e' }
            case 'completed':
              return { color: '#909399' }
            case 'pending':
              return { color: '#F7960D' }
            default:
              return {}
          }
        },
        badge: val => {
          switch (val) {
            case 'approved':
              return { name: 'el-icon-check', pos: 'left' }
            case 'completed':
              return { name: 'el-icon-check', pos: 'left' }
            case 'failed':
              return { name: 'el-icon-close', pos: 'left' }
            case 'pending':
              return { name: 'el-icon-minus', pos: 'left' }
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
  //   path: 'event-occurrences',
  // }),
  processor: new MockProcessor({
    component,
    mockFrom: 'event-occurrences',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'users'
})
