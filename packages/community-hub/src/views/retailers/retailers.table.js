import MockProcessor from '@lib/processors/mock-processor'
import RetailerStatus from './retailer-status.vue'

const INACTIVE_CELL_STYLE = {
  opacity: .4
}

function cellStyle(status) {
  switch (status) {
    case 'inactive':
      return INACTIVE_CELL_STYLE
    default:
      return {}
  }
}

const TABLE_FILTERS = [{
  attribute: 'status',
  name: 'Status',
  type: 'boolean',
  icon: 'el-icon-check',
}, {
  attribute: 'retailer_name',
  name: 'Retailer Name',
  type: 'string',
  icon: 'el-icon-document',
}, {
  attribute: 'retailer_offers',
  name: 'Number of Offers',
  type: 'numeric',
  icon: 'el-icon-document',
}, {
  attribute: 'create_at',
  name: 'Date Created',
  type: 'date',
  icon: 'el-icon-time',
}]

const TABLE_COLUMNS = [{
  name: 'status',
  label: 'Status',
  icon: 'el-icon-check',
  width: 200,
  component: (_, __, {
    row,
  }) => ({
    is: RetailerStatus,
    props: {
      status: row.status,
      inactiveStyle: INACTIVE_CELL_STYLE,
    },
  }),
}, {
  name: 'logo',
  label: 'Logo',
  icon: 'el-icon-document',
  width: 200,
  component: {
    is: 'cell-image',
  },
}, {
  name: 'retailer_name',
  label: 'Retailer Name',
  icon: 'el-icon-document',
  width: 300,
  component: {
    props: {
      styleObj(_, {
        status
      }) {
        return cellStyle(status)
      },
    },
  },
}, {
  name: 'retailer_offers',
  label: 'Number of Offers',
  icon: 'el-icon-document',
  width: 200,
  component: {
    props: {
      styleObj(_, {
        status
      }) {
        return cellStyle(status)
      },
    },
  },
}, {
  name: 'create_at',
  label: 'Date Created',
  icon: 'el-icon-time',
  format: {
    name: 'date',
    params: ['DD/MM/YYYY']
  },
  component: {
    props: {
      styleObj(_, {
        status
      }) {
        return cellStyle(status)
      },
    },
  },
  width: 200,
}, ]

export default function (context) {
  return {
    processor: new MockProcessor({
      component: context,
      mockFrom: 'retailers',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
