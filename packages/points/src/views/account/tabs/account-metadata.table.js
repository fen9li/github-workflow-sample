// import ApiProcessor from '@lib/processors/api-processor'
// import MockProcessor from '@lib/processors/mock-processor'
import Buttons from './account-metadata-buttons'

const TABLE_FILTERS = [
  // {
  //   attribute: 'createdAt',
  //   label: 'Date Created',
  //   type: 'date',
  //   icon: 'el-icon-date',
  // },
  {
    attribute: '[0]',
    label: 'Key',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: '[1]',
    label: 'Value',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  // {
  //   name: 'createdAt',
  //   label: 'Date Created',
  //   format: 'dateTime',
  //   icon: 'el-icon-date',
  //   sortable: false,
  //   width: 160,
  // },
  {
    name: '[0]',
    label: 'Key',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: '[1]',
    label: 'Value',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 100,
    component: (_, __, { row }) => ({
      is: Buttons,
      props: { row },
    }),
  },
]

// export default component => ({
//   // processor: new ApiProcessor({
//   //   component,
//   //   path: 'metadata',
//   // }),
//   processor: new MockProcessor({
//     component,
//     mockFrom: 'metadata',
//   }),
//   filters: TABLE_FILTERS,
//   columns: TABLE_COLUMNS,
//   tableName: 'metadata'
// })

export default {
  processor: null,
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
