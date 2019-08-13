import ApiProcessor from '@lib/processors/api-processor'
import merchantsStatus from './merchants-status'

const TABLE_FILTERS = [
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Enabled',
        value: true,
      },
      {
        label: 'Disabled',
        value: false,
      },
    ],
  },
  {
    attribute: 'merchant',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'total_offers',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'feeds',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'lastUpdated',
    label: 'Last updated',
    type: 'date',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'enabled',
    label: 'Global Merchant Status',
    width: 100,
    icon: 'el-icon-document',
    component: (_, __, { row }) => ({
      is: merchantsStatus,
      props: {
        row,
      },
    }),
  },
  {
    name: 'name',
    label: 'Global Merchant Name',
    width: 140,
    icon: 'el-icon-document',
  },
  {
    name: 'total_offers',
    label: 'Global Merchant Offers',
    width: 140,
    icon: 'el-icon-document',
  },
  {
    name: 'feeds',
    label: 'Global Merchant Aggregator Feeds',
    icon: 'el-icon-document',
    format: 'arrayToString',
  },
  {
    name: 'updated_at',
    label: 'Last Updated Date',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
]

export default component => ({
  processor: new ApiProcessor({
    component,
    path: 'merchants',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'merchants'
})
