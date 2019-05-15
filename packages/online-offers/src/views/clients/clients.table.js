import Static from '@lib/processors/static-processor'
import tableMock from '@tests/__fixtures__/clients'

const TABLE_FILTERS = [
  {
    attribute: 'clientName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'lastUpdated',
    icon: 'el-icon-date',
    type: 'date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'clientName',
    label: 'Client',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'feed',
    label: 'Feed',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'lastUpdated',
    label: 'Last Updated',
    format: {
      name: 'dateTime',
    },
  },
]

export default function(component) {
  return {
    processor: new Static({
      component,
      data: tableMock.table,
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}

