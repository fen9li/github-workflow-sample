const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'name',
    type: 'string',
    label: 'Pricing Plan Name',
  },
  {
    attribute: 'startOn',
    type: 'date',
  },
  {
    attribute: 'amount',
    type: 'numeric',
  },
  {
    attribute: 'billingInterval',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Monthly',
        value: 'Monthly',
      },
      {
        label: 'Quarterly',
        value: 'Quarterly',
      },
      {
        label: 'Yearly',
        value: 'Yearly',
      },
    ],
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
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'name',
    label: 'Pricing Plan Name',
    icon: 'el-icon-document',
  },
  {
    name: 'startOn',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'amount',
    format: 'dollar',
  },
  {
    name: 'billingInterval',
    type: 'select',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    component: {
      props: {
        styleObj(val) {
          switch (val) {
            case 'Active': return { color: '#29d737' }
            case 'Inactive': return { color: '#bbb' }
            default: return {}
          }
        },
        badge(val) {
          switch (val) {
            case 'Active': return {
              name: 'el-icon-success',
              pos: 'left',
            }
            case 'Inactive': return {
              name: 'el-icon-error',
              pos: 'left',
            }
            default: return {}
          }
        },
      },
    },
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
