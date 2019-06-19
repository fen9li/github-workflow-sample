const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
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
    label: 'Start Date',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'amount.total',
    format: 'dollar',
  },
  {
    name: 'billingInterval',
    format: 'capital',
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
  },
  {
    name: 'status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      is: 'cell-activity',
    },
  },
]

export default {
  columns: TABLE_COLUMNS,
}
