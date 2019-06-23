import Buttons from './category-buttons'

const TABLE_FILTERS = [

]

const TABLE_COLUMNS = [
  {
    name: 'name',
    icon: 'el-icon-document',
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 190,
    component: (_, __, { row }) => ({
      is: Buttons,
      props: { row },
    }),
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  processor: null,
}
