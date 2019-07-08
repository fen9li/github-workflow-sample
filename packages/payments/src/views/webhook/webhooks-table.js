const TABLE_FILTERS = [
  {
    attribute: 'url',
    label: 'URL',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'mode',
    label: 'Mode',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'url',
    label: 'URL',
    icon: 'el-icon-document',
  },
  {
    name: 'mode',
    label: 'Mode',
    format: 'capital',
    icon: 'el-icon-document',
    width: 50,
    component: {
      is: 'cell-tag',
      props: {
        styleObj(val) {
          if (val) {
            return { color: '#3A8463', background: '#CAF3C8' }
          }
        },
      },
    },
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
