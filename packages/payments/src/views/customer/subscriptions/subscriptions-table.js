import CustomerInformationCharge from './customer-charge.vue'

const TABLE_FILTERS = [
  {
    attribute: 'startAt',
    label: 'Start Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'endAt',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'productName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'currentAmount',
    label: 'Pricing Plan',
    type: 'numeric',
    icon: 'el-icon-tickets',
  },
  {
    attribute: 'currentInterval',
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
    attribute: 'nextBillingDate',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'outstandingBalance',
    label: 'Amount Owing',
    type: 'numeric',
    icon: 'el-icon-tickets',
  },
  // {
  //   attribute: 'coupon',
  //   type: 'string',
  //   icon: 'el-icon-document',
  // },
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
    icon: 'el-icon-document',
    label: 'Start Date',
    format: {
      name: 'dayMonthYear',
    },
    width: 120,
  },
  {
    name: 'endAt',
    label: 'End Date',
    icon: 'el-icon-document',
    format: {
      name: 'dayMonthYear',
    },
    width: 120,
  },
  {
    name: 'productName',
    label: 'Subscription Product Name',
    icon: 'el-icon-document',
  },
  {
    name: 'currentAmount',
    label: 'Pricing Plan Amount',
    icon: 'el-icon-document',
    format: 'dollar',
    width: 160,
  },
  {
    name: 'currentInterval',
    label: 'Pricing Plan Billing Interval',
    icon: 'el-icon-document',
    width: 190,
  },
  {
    name: 'nextBilledAt',
    label: 'Next Billing Date',
    icon: 'el-icon-document',
    format: {
      name: 'dayMonthYear',
    },
    width: 120,
  },
  {
    name: 'outstandingBalance',
    label: 'Balance',
    overflowTooltip: false,
    component: (_, __, { row }) => ({
      is: CustomerInformationCharge,
      props: { row },
    }),
    width: 140,
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    width: 100,
    format: {
      name: 'capital',
    },
    component: {
      is: 'cell-activity',
    },
  },
  {
    name: 'couponName',
    label: 'Coupon',
    icon: 'el-icon-document',
    width: 100,
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
