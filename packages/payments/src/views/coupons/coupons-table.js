const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'dateCreated',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'startAt',
    label: 'effectiveStartDate',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'name',
    label: 'couponName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'id',
    label: 'couponCode',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'validityPeriod',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'useCount',
    label: 'No. in Use',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'amount',
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
    label: 'Date Created',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'name',
    label: 'Coupon Name',
    icon: 'el-icon-document',
  },
  {
    name: 'id',
    label: 'Coupon Code',
    icon: 'el-icon-document',
  },
  {
    name: 'startAt',
    label: 'Effective Start Date',
    icon: 'el-icon-document',
    format: 'dayMonthShort',
  },
  {
    name: 'endAt',
    label: 'End Date',
    icon: 'el-icon-document',
    format: 'date',
  },
  {
    name: 'validityPeriod',
    label: 'Validity Period',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      props: {
        format(value) {
          switch (value) {
            case 'P1m': return '1 Month'
            case 'P3m': return '3 Months'
            case 'P1y': return '12 Months'
            default: return ''
          }
        },
      },
    },
  },
  {
    name: 'useCount',
    label: 'No. in Use',
    icon: 'el-icon-document',
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'capital',
    icon: 'el-icon-document',
    component: {
      props: {
        format(_, row) {
          return row.discountAbsolute ? `$${row.discountAbsolute.total}` : `${row.discountPercentage}%`
        },
      },
    },
  },
  {
    name: 'status',
    label: 'Status',
    format: 'capital',
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
