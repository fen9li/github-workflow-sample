import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'url',
    label: 'URL',
    type: 'string',
    icon: 'el-icon-link',
  },
  {
    attribute: 'mode',
    label: 'Mode',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'url',
    label: 'URL',
    icon: 'el-icon-link',
  },
  {
    name: 'status',
    label: 'Mode',
    format: 'capital',
    icon: 'el-icon-document',
    width: 50,
    component: {
      is: 'cell-tag',
      props: {
        styleObj(val) {
          if (val) {
            return { color: '#3A8463', background: '#CAF3C8' }
          }
        },
        value(_,row) {
          const first = row.status.toString()[0]
          return first === '4' || first === '5' ? 'Down' : 'Live'
        }
      },
    },
  },
]

export default function(component){
  return {
    processor: new ElasticProcessor({
      component,
      index: 'webhooks'
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
