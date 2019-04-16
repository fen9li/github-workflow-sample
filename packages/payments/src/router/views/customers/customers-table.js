const dateFormat = 'DD/MM/YYYY hh:mm A'

const TABLE_FILTERS = [
  {
    attribute: 'created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'externalId',
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
    name: 'created',
    label: 'Date created',
    icon: 'el-icon-document',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'externalId',
    label: 'Customer ID',
    type: 'string',
  },
  {
    name: 'firstName',
    type: 'string',
  },
  {
    name: 'lastName',
    type: 'string',
  },
  {
    name: 'email',
    type: 'string',
  },
  {
    name: 'mobile',
    type: 'string',
  },
  {
    name: 'address',
    type: 'string',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    component: {
      is: 'cell-activity',
    },
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
