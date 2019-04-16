import CustomerInformationCharge from './customer-information-charge.vue'

const dateFormat = 'DD/MM/YYYY hh:mm A'

const TABLE_FILTERS = [
  {
    attribute: 'startDate',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'endDate',
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
    name: 'startDate',
    icon: 'el-icon-document',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'endDate',
    icon: 'el-icon-document',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'productName',
    icon: 'el-icon-document',
  },
  {
    name: 'currentAmount',
    label: 'Plan',
    icon: 'el-icon-document',
    format: 'dollar',
  },
  {
    name: 'currentInterval',
    label: 'Billing Interval',
    icon: 'el-icon-document',
  },
  {
    name: 'nextBillingDate',
    icon: 'el-icon-document',
    format: {
      name: 'date',
      params: [dateFormat],
    },
  },
  {
    name: 'outstandingBalance',
    label: 'Amount Owing',
    overflowTooltip: false,
    component: (_, __, { row }) => ({
      is: CustomerInformationCharge,
      props: { row },
    }),
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
