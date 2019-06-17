// import Elastic from '@lib/processors/elastic-processor'
import Static from '@lib/processors/static-processor'
import tableMock from '@tests/__fixtures__/merchants'
// import cellToggle from '~/components/cells/cell-toggle'

const TABLE_FILTERS = [
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
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
    attribute: 'merchant',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'offers',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'feed',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'lastUpdated',
    label: 'Last updated',
    type: 'date',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'status',
    icon: 'el-icon-document',
    component: {
      is: 'cell-toggle',
    },
  },
  {
    name: 'merchantName',
    label: 'Merchant',
    icon: 'el-icon-document',
  },
  {
    name: 'merchantOffers',
    label: 'Offers',
    icon: 'el-icon-document',
  },
  {
    name: 'feed',
    icon: 'el-icon-document',
  },
  {
    name: 'lastUpdated',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
]

export default function(component) {
  return {
    // processor: new Elastic({
    //   component,
    //   index: 'client/1/merchants',
    // }),
    processor: new Static({
      component,
      data: tableMock.table,
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
