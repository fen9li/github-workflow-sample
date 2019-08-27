import ElasticProcessor from '@lib/processors/elastic-processor'
// import webhookMock from '@tests/__fixtures__/webhook'

const TABLE_COLUMNS = [
  {
    name: 'type',
    label: 'Event Type',
    icon: 'el-icon-document',
    width: 250,
  },
  {
    name: 'id',
    label: 'Event ID',
    icon: 'el-icon-document',
    width: 250,
  },
  {
    name: 'createdAt',
    label: 'Date',
    icon: 'el-icon-document',
    format: 'dateTime',
    width: 250,
  },
  {
    name: 'successful',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      is: 'cell-tag',
      props: {
        styleObj(val) {
          switch(val()) {
            case 'success': return { color: '#3A8463', background: '#CAF3C8' }
            case 'failed': return  { color: 'var(--color-error)', background: '#FBD2D2' }
          }
        },
        value(val) {
          return val ? 'success' : 'failed'
        }
      },
    },
    width: 100,
  },
  { type: 'expand' },
]

export default function(component) {
  return {
    processor: new ElasticProcessor({
      component,
      index: 'webhook-responses',
      staticQuery: {
        filters: [
          {
            attribute: 'requestId',
            value: component.id,
          },
        ],
      },
    }),
    columns: TABLE_COLUMNS,
  }
}
