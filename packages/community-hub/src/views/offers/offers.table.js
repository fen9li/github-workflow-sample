import MockProcessor from '@lib/processors/mock-processor'

const inactiveCell = {
  props: {
    styleObj(val, { status }) {
      if (status === 'inactive') {
        return {
          color: '#a7a7a7',
        }
      }
      return {}
    },
  },
}

const TABLE_FILTERS = [
  {
    attribute: 'status',
    name: 'Status',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'created_at',
    label: 'Created',
    type: 'date',
    icon: 'el-icon-time',
  },
  {
    attribute: 'retailer_name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'offer_name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'categories',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'offer_type',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'locations',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'end_at',
    label: 'End Date',
    type: 'date',
    icon: 'el-icon-time',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    width: 100,
    format: {
      name: 'capital',
    },
    component: {
      is: 'cell-activity',
      ...inactiveCell,
    },
  },
  {
    name: 'created_at',
    icon: 'el-icon-document',
    format: 'date',
    width: 100,
    component: inactiveCell,
  },
  {
    name: 'logo',
    label: 'Logo',
    icon: 'el-icon-document',
    width: 60,
    component: {
      is: 'cell-logo',
    },
    format(value) {
      if (value) {
        return `${value}//-/preview/40x40/-/quality/best/`
      }
      return false
    },
  },
  {
    name: 'retailer_name',
    label: 'Retailer Name',
    icon: 'el-icon-document',
    width: 120,
    component: inactiveCell,
  },
  {
    name: 'offer_name',
    label: 'Offer Name',
    icon: 'el-icon-document',
    width: 120,
    component: inactiveCell,
  },
  {
    name: 'categories',
    label: 'Category',
    icon: 'el-icon-document',
    format: 'arrayToString',
    width: 120,
    component: inactiveCell,
  },
  {
    name: 'offer_type',
    label: 'Offer Type',
    icon: 'el-icon-document',
    width: 120,
    component: inactiveCell,
  },
  {
    name: 'locations',
    label: 'Locations',
    icon: 'el-icon-document',
    width: 120,
    format: 'arrayCount',
    component: inactiveCell,
  },
  {
    name: 'end_at',
    label: 'End Date',
    icon: 'el-icon-document',
    format: 'date',
    width: 100,
    component: inactiveCell,
  },
]

export default function(context) {
  return {
    processor: new MockProcessor({
      component: context,
      mockFrom: 'offers',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
