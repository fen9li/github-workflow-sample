// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date'
  },
  {
    attribute: 'id',
    label: 'Provider ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Provider Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'earnRare',
    label: 'Provider Earn rate',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'burnRate',
    label: 'Provider Burn rate',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'scheduledRate',
    label: 'Scheduled Rate',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'updatedAp',
    label: 'Last Updated',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    type: 'select',
    values: [
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ]
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 120,
  },
  {
    name: 'id',
    label: 'Provider ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Provider Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'earnRare',
    label: 'Provider Earn rate',
    type: 'string',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'burnRate',
    label: 'Provider Burn rate',
    type: 'string',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'scheduledRate',
    label: 'Scheduled Rate',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 120,
  },
  {
    name: 'updatedAp',
    label: 'Last Updated',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 120,
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: {
      name: 'capital',
    },
    width: 80,
    component: {
      props: {
        styleObj(_, row) {
          switch (row.status) {
            case 'active':
              return { color: '#29d737' }
            case 'inactive':
              return { color: '#fc7168' }
            default:
              return {}
          }
        },
        badge(_, row) {
          switch (row.status) {
            case 'active':
              return {
                name: 'el-icon-check',
                pos: 'left',
              }
            case 'inactive':
              return {
                name: 'el-icon-close',
                pos: 'left',
              }
            default:
              return {}
          }
        },
      },
    },
  },
]

export default function(component) {
  return {
    processor: new MockProcessor({
      component,
      mockFrom: 'providers',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
