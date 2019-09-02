// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
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
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'updatedAt',
    label: 'Last updated',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'timezone',
    name: 'Timezone',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    name: 'Status',
    type: 'string',
    icon: 'el-icon-document',
  }
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: 'date',
    width: 100,
  },
  {
    name: 'id',
    label: 'Provider ID',
    sortable: false,
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'name',
    label: 'Provider Name',
    icon: 'el-icon-document',
  },
  {
    name: 'updatedAt',
    label: 'Last Updated',
    icon: 'el-icon-date',
    format: 'date',
    width: 100,
  },
  {
    name: 'timezone',
    label: 'Timezone',
    icon: 'el-icon-document',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: {
      name: 'capital',
    },
    component: {
      is: 'cell-activity',
    },
    width: 100,
  },
]

// export default component => ({
//   processor: new ApiProcessor({ component, path: 'providers' }),
//   filters: TABLE_FILTERS,
//   columns: TABLE_COLUMNS,
//   tableName: 'providers'
// })

export default function(context) {
  return {
    processor: new MockProcessor({
      component: context,
      mockFrom: 'providers',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
    tableName: 'providers'
  }
}
