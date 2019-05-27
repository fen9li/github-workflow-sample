const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'externalId',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'name',
    label: 'Product Name',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'billingType',
    label: 'Billing Cycle',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'anchorOn',
    label: 'Anchor Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'endAt',
    label: 'End Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'productCount',
    icon: 'el-icon-document',
    type: 'numeric',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'active',
        value: 'Active',
      },
      {
        label: 'inactive',
        value: 'Inactive',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'externalId',
    label: 'Code',
    format: 'uppercase',
    width: 140,
  },
  {
    name: 'name',
    label: 'Product Name',
  },
  {
    name: 'billingType',
    label: 'Billing Cycle',
    format: 'capital',
  },
  {
    name: 'anchorOn',
    label: 'Anchor Date',
    format: 'dayMonth',
  },
  {
    name: 'endDate',
    label: 'End Date',
    format: 'date',
  },
  {
    name: 'productCount',
    label: 'Plans',
    width: 80,
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      is: 'cell-activity',
    },
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
