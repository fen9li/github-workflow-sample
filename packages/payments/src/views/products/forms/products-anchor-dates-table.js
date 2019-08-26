import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_COLUMNS = [
  {
    name: 'id',
    label: 'Code',
    icon: 'el-icon-document',
    width: 130,
  },
  {
    name: 'name',
    icon: 'el-icon-goods',
  },
  {
    name: 'anchorAt',
    icon: 'el-icon-date',
    width: 90,
    format: 'dayMonthShort',
  },
]

export default function(component){
  return {
    processor: new ElasticProcessor({
      component,
      index: 'subscription-products',
      staticQuery: {
        filters: [
          {
            attribute: 'billingType',
            value: 'prorata',
          },
        ],
      },
    }),
    columns: TABLE_COLUMNS,

  }
}
