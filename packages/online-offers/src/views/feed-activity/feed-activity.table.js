import ApiProcessor from '@lib/processors/api-processor'

const TABLE_FILTERS = [
  {
    attribute: 'status',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'feed',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Commission factory',
        value: 'Commission factory',
      },
      {
        label: 'Rakuten',
        value: 'Rakuten',
      },
      {
        label: 'APD',
        value: 'APD',
      },
    ],
  },
  {
    attribute: 'reason',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'updated_at',
    label: 'Last updated',
    type: 'date',
    icon: 'el-icon-date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      props: {
        allowEmpty: true,
        styleObj(val) {
          switch (val) {
            case 'success':
              return { color: '#3bb720' }
            case 'failed':
              return { color: '#fc1e1e' }
            default:
              return {}
          }
        },
        badge: value => ({
          name: value === 'success' ? 'el-icon-check' : 'el-icon-close',
          pos: 'left',
        }),
      },
    },
  },
  {
    name: 'feed',
    label: 'Aggregators',
    icon: 'el-icon-document',
    format: value => {
      switch (value) {
        case 'apd': return 'APD'
        case 'rakuten': return 'Rakuten'
        case 'commission_factory': return 'Commission factory'
        default: return value
      }
    },
  },
  {
    name: 'reason',
    label: 'Comments',
    icon: 'el-icon-document',
    format: value => {
      return value || '-'
    },
    component: {
      props: {
        styleObj(_, row) {
          const { status } = row

          if (status === 'failed') {
            return { color: '#fc1e1e' }
          }

          return {}
        },
        allowEmpty: true,
      },
    },
  },
  {
    name: 'updated_at',
    label: 'Last updated',
    icon: 'el-icon-date',
    format: 'dateTime',
  },
  { name: 'expanded' },
]

export default component => ({
  processor: new ApiProcessor({
    component,
    path: '/feeds/sync-logs',
    index: 'merchants',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
})
