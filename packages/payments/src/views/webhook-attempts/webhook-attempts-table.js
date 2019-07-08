import StaticProcessor from '@lib/processors/static-processor'
import webhookMock from '@tests/__fixtures__/webhook'

const TABLE_FILTERS = [
  {
    attribute: 'url',
    label: 'URL',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'type',
    label: 'Type',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'id',
    label: 'Event ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'date',
    label: 'Date',
    type: 'date',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Failed',
        value: 'failed',
      },
      {
        label: 'Success',
        value: 'success',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'url',
    label: 'URL',
    icon: 'el-icon-document',
    width: 250,
  },
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
    width: 200,
  },
  {
    name: 'date',
    label: 'Date',
    icon: 'el-icon-document',
    format: 'dateTime',
    width: 160,
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
]

export default function(component) {
  return {
    processor: new StaticProcessor({
      component,
      data: webhookMock.table,
    }),
    columns: TABLE_COLUMNS,
    filters: TABLE_FILTERS,
  }
}
