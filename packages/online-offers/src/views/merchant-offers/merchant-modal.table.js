const TABLE_FILTERS = [
]

const TABLE_COLUMNS = [
  {
    name: 'name',
    label: 'Offer Name',
  },
  {
    name: 'feed_offer.feed',
    label: 'Feed',
  },
  {
    name: 'created_at',
    label: 'Last updated',
    format: 'date',
  },
]

export default function(component) {
  return {
    processor: null,
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
