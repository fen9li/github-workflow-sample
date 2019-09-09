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
    label: 'Membership ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Membership Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'startAt',
    label: 'Start Date',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'endAt',
    label: 'End Date',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'duration',
    label: 'Duration',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    name: 'Status',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    format: 'dateTime',
    icon: 'el-icon-date',
    width: 100,
  },
  {
    name: 'id',
    label: 'Membership ID',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Membership Name',
    icon: 'el-icon-document',
  },
  {
    name: 'startAt',
    label: 'Start Date',
    format: 'dateTime',
    icon: 'el-icon-date',
    width: 160,
  },
  {
    name: 'endAt',
    label: 'End Date',
    format: 'dateTime',
    icon: 'el-icon-date',
    width: 160,
  },
  {
    name: 'duration',
    label: 'Duration',
    icon: 'el-icon-document',
    width: 160,
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

export default component => ({
  // processor: new ApiProcessor({
  //   component,
  //   path: 'membership',
  // }),
  processor: new MockProcessor({
    component,
    mockFrom: 'memberships',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'membership'
})
