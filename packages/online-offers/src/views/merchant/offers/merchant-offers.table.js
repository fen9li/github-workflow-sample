const TABLE_FILTERS = [
  {
    attribute: 'name',
    name: 'Offer Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'description',
    name: 'Offer description',
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
    attribute: 'global_merchant.enabled',
    label: 'Global Merchant Status',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'created_at',
    type: 'date',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'name',
    label: 'Offer Name',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'description',
    label: 'Offer description',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'feed_offer.feed',
    label: 'Feed',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'global_merchant.enabled',
    label: 'Global Merchant Status',
    icon: 'el-icon-document',
    format(value) {
      return value ? 'Enabled' : 'Disabled'
    }
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
