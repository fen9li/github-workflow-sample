import ApiProcessor from '@lib/processors/api-processor'
import offersStatus from './offers-status'

const TABLE_FILTERS = [
  {
    attribute: 'status',
    label: 'Enabled',
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
    attribute: 'name',
    label: 'Offer Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'description',
    label: 'Offer Description',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'global_merchant',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'feed_offer.feed',
    label: 'Feed',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'created_at',
    label: 'Offer Start Date',
    type: 'date',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'enabled',
    width: 70,
    icon: 'el-icon-document',
    component: (_, __, { row }) => ({
      is: offersStatus,
      props: {
        row,
      },
    }),
  },
  {
    name: 'name',
    label: 'Offer Name',
    icon: 'el-icon-document',
  },
  {
    name: 'description',
    label: 'Offer Description',
    icon: 'el-icon-document',
  },
  {
    name: 'global_merchant.name',
    width: 130,
    label: 'Global Merchant',
    icon: 'el-icon-document',
  },
  {
    name: 'feed_offer.feed',
    label: 'Feed',
    icon: 'el-icon-document',
  },
  {
    name: 'created_at',
    label: 'Offer Start Date',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
]

export default component => ({
  processor: new ApiProcessor({ component, path: 'offers' }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'offers'
})
