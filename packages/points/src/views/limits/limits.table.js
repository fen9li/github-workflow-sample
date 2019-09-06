// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'Limit ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Limit Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'type',
    label: 'Type',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'priority',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'startAt',
    label: 'Start At',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'endAt',
    label: 'Finish At',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'updatedAt',
    label: 'Last Updated',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'eventId',
    label: 'Event Limit',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'providerName',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 160,
  },
  {
    name: 'id',
    label: 'Limit ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Limit Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    name: 'type',
    label: 'Type',
    type: 'string',
    icon: 'el-icon-document',
    format: 'capital',
    width: 70,
  },
  {
    name: 'priority',
    type: 'string',
    icon: 'el-icon-document',
    width: 80,
  },
  {
    name: 'startAt',
    label: 'Start At',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 160,
  },
  {
    name: 'endAt',
    label: 'Finish At',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 160,
  },
  {
    name: 'updatedAt',
    label: 'Last Updated',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 160,
  },
  {
    name: 'eventId',
    label: 'Event Limit',
    type: 'string',
    icon: 'el-icon-document',
    format: v => {
      if (v) {
        return 'Yes'
      }

      return 'No'
    },
    width: 100,
  },
  {
    name: 'providerName',
    icon: 'el-icon-document',
  },
]

export default function(component) {
  return {
    processor: new MockProcessor({
      component,
      // path: 'limits',
      mockFrom: 'limits'
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
