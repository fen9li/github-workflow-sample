const TABLE_FILTERS = [
  {
    attribute: 'created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'productGroupExternalId',
    type: 'string',
  },
  {
    attribute: 'name',
    label: 'Product Name',
    type: 'string',
  },
  {
    attribute: 'startDate',
    label: 'Effective Start Date',
    type: 'date',
  },
  {
    attribute: 'sunset',
    label: 'End Date',
    type: 'date',
  },
  {
    attribute: 'pricingPlanCount',
    type: 'numeric',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created',
    label: 'Date created',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'name',
    label: 'Name of Product',
    width: 300,
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'dollar',
  },
  {
    name: 'startDate',
    label: 'Effective Start Date',
    format: 'dateTime',
  },
  {
    name: 'endDate',
    label: 'End Date',
    format: 'dateTime',
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
