import StaticProcessor from '@lib/processors/static-processor'
import webhookMock from '@tests/__fixtures__/webhook'

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
    name: 'date',
    label: 'Date',
    icon: 'el-icon-document',
    format: 'dateTime',
    width: 250,
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      is: 'cell-tag',
      props: {
        styleObj(val) {
          // TODO: Add switch when know all possible statuses
          if (val === 'failed') {
            return { color: 'var(--color-error)', background: '#FBD2D2' }
          }
        },
      },
    },
    width: 100,
  },
  { type: 'expand' },
]

export default function(component) {
  return {
    processor: new StaticProcessor({
      component,
      data: webhookMock.table,
    }),
    columns: TABLE_COLUMNS,
  }
}
