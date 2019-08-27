import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'category_name',
    label: 'Category Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'retailers_count',
    label: 'No. of Retailers',
    type: 'numeric',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'category_name',
    label: 'Category Name',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'retailers_count',
    label: 'No. of Retailers',
    icon: 'el-icon-document',
  },
]

export default function(context) {
  return {
    processor: new MockProcessor({
      component: context,
      mockFrom: 'categories',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
