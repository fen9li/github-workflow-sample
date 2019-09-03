// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'
import LogStatus from './log-status.vue'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'Log ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'description',
    label: 'Product Description',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    label: 'Status',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    type: 'string',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 100,
  },
  {
    name: 'id',
    label: 'Log ID',
    type: 'string',
    icon: 'el-icon-document',
    width: 80,
  },
  {
    name: 'description',
    type: 'string',
    icon: 'el-icon-document',
    width: 260,
  },
  {
    name: 'value',
    label: 'Product Description',
    type: 'string',
    icon: 'el-icon-document',
    width: 160,
  },
  {
    name: 'updatedBy',
    type: 'string',
    icon: 'el-icon-document',
    width: 160,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'string',
    icon: 'el-icon-document',
    format: {
      name: 'capital',
    },
    width: 100,
    component: value => ({
      is: LogStatus,
      props: {
        status: value,
      },
    }),
  },
]

export default function(component) {
  return {
    processor: new MockProcessor({
      component,
      mockFrom: 'logs',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
