const TABLE_FILTERS = [
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
    attribute: 'customerFirstName',
    label: 'First Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'customerLastName',
    label: 'Last Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'productName',
    label: 'Subscription Product',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'currentInterval',
    label: 'Frequency',
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
    attribute: 'outstandingBalance',
    label: 'Amount Owing',
    type: 'numeric',
    icon: 'el-icon-money',
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
    name: 'startAt',
    label: 'Start Date',
    icon: 'el-icon-date',
    format: 'date',
    width: 130,
  },
  {
    name: 'endAt',
    label: 'End Date',
    icon: 'el-icon-date',
    format: 'date',
    width: 130,
  },
  {
    name: 'customerFirstName',
    label: 'First Name',
    icon: 'el-icon-document',
    width: 140,
  },
  {
    name: 'customerLastName',
    label: 'Last Name',
    icon: 'el-icon-document',
    width: 140,
  },
  {
    name: 'productName',
    icon: 'el-icon-document',
    width: 200,
  },
  {
    name: 'currentInterval',
    label: 'Frequency',
    format: 'capital',
    icon: 'el-icon-document',
    component: {
      props: {
        format(value) {
          switch (value) {
            case 'P1m': return 'Monthly'
            case 'P3m': return 'Quarterly'
            case 'P1y': return 'Yearly'
          }
        },
      },
    },
    width: 130,
  },
  {
    name: 'outstandingBalance.total',
    label: 'Amount Owing',
    icon: 'el-icon-money',
    format: 'dollar',
    component: {
      props: {
        styleObj(val) {
          return { color: '#fc7168' }
        },
      },
    },
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      is: 'cell-activity',
    },
    width: 100,
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
