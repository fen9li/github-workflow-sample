import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'url',
    label: 'URL',
    type: 'string',
    icon: 'el-icon-link',
  },
  {
    attribute: 'type',
    label: 'Type',
    type: 'string',
    icon: 'el-icon-s-operation',
  },
  {
    attribute: 'id',
    label: 'Event ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'createdAt',
    label: 'Date',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'successful',
    label: 'Status',
    type: 'select',
    icon: 'el-icon-circle-check',
    values: [
      {
        label: 'Failed',
        value: false,
      },
      {
        label: 'Success',
        value: true,
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'url',
    label: 'URL',
    icon: 'el-icon-link',
    width: 250,
  },
  {
    name: 'type',
    label: 'Event Type',
    icon: 'el-icon-s-operation',
    width: 250,
  },
  {
    name: 'id',
    label: 'Event ID',
    icon: 'el-icon-document',
    width: 200,
  },
  {
    name: 'createdAt',
    label: 'Date',
    icon: 'el-icon-date',
    format: 'dateTime',
    width: 160,
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
]

export default function(component) {
  return {
    processor: new ElasticProcessor({
      component,
      index: 'webhook-responses'
    }),
    columns: TABLE_COLUMNS,
    filters: TABLE_FILTERS,
  }
}
