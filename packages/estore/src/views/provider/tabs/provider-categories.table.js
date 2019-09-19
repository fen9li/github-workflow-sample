// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'
import tableCellList from './table-cell-list'

const TABLE_FILTERS = [
  {
    attribute: 'created_at',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'groupName',
    label: 'Group',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'tiers',
    label: 'Tiers',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'tiers.categories',
    label: 'Categories',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'updated_at',
    label: 'Last updated',
    icon: 'el-icon-date',
    type: 'date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created_at',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: 'dateTime',
    width: 150,
    component: {
      props: {
        styleObj() {
          return { paddingTop: 0 }
        }
      }
    }
  },
  {
    name: 'groupName',
    label: 'Groups',
    icon: 'el-icon-document',
    width: 130,
    component: {
      props: {
        styleObj() {
          return { paddingTop: 0 }
        }
      }
    }
  },
  {
    name: 'tiers',
    label: 'Tiers',
    icon: 'el-icon-document',
    width: 130,
    component: {
      is: tableCellList,
      props: {
        value(val, row) {
          return row.tiers.map(tier => tier.name)
        },
        offsets(val, row) {
          return row.tiers.map(tier => tier.categories.length - 1)
        }
      }
    }
  },
  {
    name: 'categories',
    label: 'Categories',
    icon: 'el-icon-document',
    width: 130,
    component: {
      is: tableCellList,
      props: {
        value(val, row) {
          return row.tiers.map(v => v.categories)
        },
      }
    }
  },
  {
    name: 'updated_at',
    label: 'Last updated',
    icon: 'el-icon-date',
    format: 'dateTime',
    width: 160,
    component: {
      props: {
        styleObj() {
          return { paddingTop: 0 }
        }
      }
    }
  },
]

export default component => ({
  // processor: new ApiProcessor({ component, path: 'provider-categories' }),
  processor: new MockProcessor({
    component,
    mockFrom: 'provider-categories',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'provider-catalogue',
})
