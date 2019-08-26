const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'description',
    type: 'string',
    icon: 'el-icon-data-board',
  },
  {
    attribute: 'status',
    type: 'string',
    icon: 'el-icon-circle-check',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: 'dateTime',
    width: 200,
  },
  {
    name: 'description',
    label: 'Description',
    icon: 'el-icon-data-board',
    width: 500,
  },
  {
    name: 'status',
    label: 'Status',
    format: {
      name: 'httpStatus',
    },
    icon: 'el-icon-circle-check',
    align: 'right',
    component: {
      is: 'cell-tag',
      props: {
        styleObj(val) {
          if (Number(val[0]) === 4) {
            return { color: 'red', background: '#FBE6D1' }
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
