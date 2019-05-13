const TABLE_FILTERS = [
  {
    attribute: 'clientName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'lastUpdated',
    icon: 'el-icon-date',
    type: 'date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'clientLogo',
    label: 'Logo',
    icon: 'el-icon-document',
  },
  {
    name: 'clientName',
    label: 'Client',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'feed',
    label: 'Feed',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'lastUpdated',
    label: 'Last Updated',
    format: {
      name: 'dayMonthYear',
    },
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
