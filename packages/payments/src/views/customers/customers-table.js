const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'id',
    type: 'string',
    label: 'Customer ID',
    icon: 'el-icon-document',
  },
  {
    attribute: 'firstName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'lastName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'email',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'mobile',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'address',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Active',
        value: 'Active',
      },
      {
        label: 'Inactive',
        value: 'Inactive',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Сreated',
    icon: 'el-icon-document',
    format: {
      name: 'dayMonthYear',
    },
    width: 90,
  },
  {
    name: 'id',
    label: 'Customer ID',
    type: 'string',
    width: 90,
  },
  {
    name: 'firstName',
    type: 'string',
    width: 100,
  },
  {
    name: 'lastName',
    type: 'string',
    width: 100,
  },
  {
    name: 'email',
    type: 'string',
    width: 130,
  },
  {
    name: 'mobile',
    type: 'string',
    width: 100,
  },
  {
    name: 'address',
    type: 'string',
    width: 160,
  },
  {
    name: 'status',
    label: 'Status',
    format: {
      name: 'capital',
    },
    icon: 'el-icon-document',
    component: {
      is: 'cell-activity',
    },
    width: 50,
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
