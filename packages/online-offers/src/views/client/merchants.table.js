const TABLE_FILTERS = [
  {
    attribute: 'merchant',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'offers',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'feed',
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
    name: 'name',
    label: 'Merchant',
    icon: 'el-icon-document',
  },
  {
    name: 'total_offers',
    labels: 'Offers',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'feeds',
    icon: 'el-icon-document',
    format: value => {
      return value.join(', ')
    },
  },
  {
    name: 'updated_at',
    label: 'Last updated',
    icon: 'el-icon-date',
    format: 'date',
  },
]

export default function(component) {
  return {
    processor: null,
    linked: {
      filters: TABLE_FILTERS,
      columns: TABLE_COLUMNS,
    },
    unlinked: {
      filters: TABLE_FILTERS,
      columns: TABLE_COLUMNS,
    },
  }
}
