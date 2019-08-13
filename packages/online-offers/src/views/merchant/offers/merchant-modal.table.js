const TABLE_FILTERS = []

const TABLE_COLUMNS = [
  {
    name: 'name',
    label: 'Offer Name',
    sortable: false,
  },
  {
    name: 'feed_offer.feed',
    label: 'Feed',
    sortable: false,
  },
  {
    name: 'created_at',
    label: 'Last updated',
    sortable: false,
    format: 'date',
  },
]

export default {
  processor: null,
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
