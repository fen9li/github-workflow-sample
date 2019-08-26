import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_COLUMNS = [
  {
    name: 'type',
    label: 'Label',
    format: 'capital',
    icon: 'el-icon-price-tag',
    sortable: false,
  },
  {
    name: 'count',
    label: 'Count',
    align: 'right',
    icon: 'el-icon-files',
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'dollar',
    align: 'right',
    icon: 'el-icon-money',
  },
  {
    name: 'fee',
    label: 'Fee',
    format: 'dollar',
    align: 'right',
    icon: 'el-icon-money',
  },
  {
    name: 'net',
    label: 'NET',
    format: 'dollar',
    align: 'right',
    icon: 'el-icon-money',
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
