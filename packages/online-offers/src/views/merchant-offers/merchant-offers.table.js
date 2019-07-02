const TABLE_FILTERS = [
  {
    attribute: 'offerName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'description',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'feed',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'offerStarts',
    type: 'date',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        value: 'active',
        label: 'Active',
      },
      {
        value: 'activate',
        label: 'Activate',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'offerName',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'description',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'feed',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'offerStarts',
    icon: 'el-icon-document',
    format: 'dayMonthYear',
    width: 100,
  },
  {
    name: 'status',
    icon: 'el-icon-document',
    width: 90,
  },
]

export default {
  processor: null,
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
