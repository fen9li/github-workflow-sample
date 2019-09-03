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
    label: 'Version Id',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'name',
    label: 'Version Name',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'status',
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
    ],
  },
  {
    attribute: 'latest',
    label: 'Latest?',
    icon: 'el-icon-document',
    type: 'boolean',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY'],
    },
    width: 200,
  },
  {
    name: 'id',
    label: 'Version Id',
    icon: 'el-icon-document',
    width: 200,
  },
  {
    name: 'name',
    label: 'Version Name',
    icon: 'el-icon-document',
    width: 200,
  },
  {
    name: 'status',
    icon: 'el-icon-document',
    width: 200,
    format: 'capital',
    component: {
      props: {
        styleObj(_, row) {
          switch (row.status) {
            case 'active':
              return {
                color: '#36d544',
              }
            case 'inactive':
              return {
                color: '#e21d1f',
              }
            default:
              return {}
          }
        },
        badge(_, row) {
          switch (row.status) {
            case 'active':
              return {
                name: 'el-icon-check',
                pos: 'left'
              }
            case 'inactive':
              return {
                name: 'el-icon-close',
                pos: 'left'
              }
            default:
              return {}
          }
        },
      },
    },
  },
  {
    name: 'latest',
    label: 'Latest?',
    icon: 'el-icon-document',
    width: 200,
    format: () => '',
    component: {
      props: {
        allowEmpty: true,
        styleObj(_, row) {
          if (row.latest) {
            return {
              color: '#36d544',
            }
          }

          return {}
        },
        badge(_, row) {
          if (row.latest) {
            return {
              name: 'el-icon-check',
              pos: 'left',
            }
          }

          return {}
        },
      },
    },
  },
]

export default component => ({
  // processor: null,
  processor: new MockProcessor({
    component,
    mockFrom: 'product-versions-tab',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
})
