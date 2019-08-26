const TABLE_FILTERS = [
  {
    attribute: 'status',
    name: 'Status',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'logo',
    label: 'Logo',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'retailerName',
    label: 'Retailer Name',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'retailerOffers',
    label: 'Retailer Offers',
    icon: 'el-icon-document',
  },
  {
    name: 'created_at',
    icon: 'el-icon-document',
    format: 'date',
    width: 100,
  },
]

export default {
  processor: null,
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
