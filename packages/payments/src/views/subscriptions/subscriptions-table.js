const dateFormat = 'DD/MM/YYYY hh:mm A'

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
    attribute: 'productName',
    label: 'Subscription Product',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'currentInterval',
    label: 'Pricing Plan Billing Interval',
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
    attribute: 'nextBilledAt',
    label: 'Next Billing Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'outstandingBalance',
    label: 'Balance',
    type: 'numeric',
    icon: 'el-icon-money',
  },
  {
    attribute: 'couponName',
    label: 'Coupon',
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
  {
    attribute: 'customerId',
    label: 'Customer ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'customerEmailAddress',
    label: 'Customer Email Address',
    type: 'string',
    icon: 'el-icon-message',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'startAt',
    label: 'Start Date',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'endAt',
    label: 'End Date',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'productName',
    label: 'Subscription Product',
    icon: 'el-icon-document',
  },
  {
    name: 'currentInterval',
    label: 'Pricing Plan Billing Interval',
    icon: 'el-icon-document',
  },
  {
    name: 'nextBilledAt',
    label: 'Next Billing Date',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'outstandingBalance.total',
    label: 'Balance',
    icon: 'el-icon-money',
    format: 'dollar',
  },
  {
    name: 'couponName',
    label: 'Coupon',
    icon: 'el-icon-document',
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
  {
    name: 'customerId',
    label: 'Customer ID',
    icon: 'el-icon-document',
  },
  {
    name: 'customerEmailAddress',
    label: 'Customer Email Address',
    icon: 'el-icon-message',
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
