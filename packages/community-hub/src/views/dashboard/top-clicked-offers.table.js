import MockProcessor from '@lib/processors/mock-processor'

const TABLE_COLUMNS = [
  {
    name: 'retailer_name',
    label: 'Retailer',
    width: 150,
  },
  {
    name: 'offer_name',
    label: 'Offer Name',
  },
  {
    name: 'clicks',
    label: 'Clicks',
    width: 60,
  },
]

export default function(context) {
  return {
    processor: new MockProcessor({
      component: context,
      mockFrom: 'top-clicked-offers',
    }),
    columns: TABLE_COLUMNS,
    tableName: 'top-clicked-offers'
  }
}
