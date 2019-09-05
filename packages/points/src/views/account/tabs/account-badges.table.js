// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'earnedOn',
    label: 'Badge last earned on',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'Badge ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Badge Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'logo',
    label: 'Badge Logo',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'description',
    label: 'Badge Description',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'attained',
    label: 'Times attained',
    type: 'date',
    icon: 'el-icon-date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'earnedOn',
    label: 'Badge last earned on',
    format: 'dateTime',
    icon: 'el-icon-date',
    width: 120,
  },
  {
    name: 'id',
    label: 'Badge ID',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Badge Name',
    icon: 'el-icon-document',
  },
  {
    name: 'logo',
    label: 'Badge Logo',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'description',
    label: 'Badge Description',
    icon: 'el-icon-document',
  },
  {
    name: 'attained',
    label: 'Times attained',
    icon: 'el-icon-document',
    width: 100,
  },
]

export default component => ({
  // processor: new ApiProcessor({
  //   component,
  //   path: 'accounts',
  // }),
  processor: new MockProcessor({
    component,
    mockFrom: 'badges',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'badges'
})
