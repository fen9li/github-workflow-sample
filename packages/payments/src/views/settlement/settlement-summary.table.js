import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_COLUMNS = [
  {
    name: 'type',
    label: '',
    format: 'capital',
    sortable: false,
  },
  {
    name: 'count',
    label: 'Count',
    align: 'right',
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'dollar',
    align: 'right',
  },
  {
    name: 'fee',
    label: 'Fee',
    format: 'dollar',
    align: 'right',
  },
  {
    name: 'net',
    label: 'NET',
    format: 'dollar',
    align: 'right',
  },
]


export default function(component) {
  return {
    processor: new ElasticProcessor({
      component,
      index: 'transactions',
      dataTransform: component.transformSummaryTableData,
      staticQuery: {
        filters: [
          {
            attribute: 'settlementId',
            value: component.id,
          },
        ],
      },
      query: {
        pageSize: 1000,
      },
    }),
    columns: TABLE_COLUMNS,
  }
}
