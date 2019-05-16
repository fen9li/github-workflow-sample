import StaticProcessor from '@lib/processors/static-processor'
import tableMock from '@tests/__fixtures__/feed-status'

const TABLE_FILTERS = [
  {
    attribute: 'status',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'aggregators',
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
    attribute: 'api_call',
    label: 'API Call',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'comments',
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
    format: () => '',
    component: {
      props: {
        allowEmpty: true,
        styleObj(val) {
          switch (val) {
            case 'active': return { color: '#3bb720' }
            case 'inactive': return { color: '#fc1e1e' }
            default: return {}
          }
        },
        badge: {
          name: 'el-icon-info',
          pos: 'left',
        },
      },
    },
  },
  {
    name: 'aggregators',
    icon: 'el-icon-document',
  },
  {
    name: 'api_call',
    label: 'API Call',
    icon: 'el-icon-document',
  },
  {
    name: 'comments',
    icon: 'el-icon-document',
    component: {
      props: {
        styleObj(_, row) {
          const { status } = row

          if (status === 'inactive') {
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
]

export default function(component) {
  return {
    // processor: new Elastic({
    //   component,
    //   index: 'merchants',
    // }),
    processor: new StaticProcessor({
      component,
      data: tableMock.table,
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
