// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [{
  attribute: 'createdAt',
  label: 'Date Created',
  icon: 'el-icon-date',
  type: 'date'
}, {
  attribute: 'id',
  label: 'Rule ID',
  type: 'string',
  icon: 'el-icon-document',
}, {
  attribute: 'name',
  label: 'Rule Name',
  type: 'string',
  icon: 'el-icon-document',
}, {
  attribute: 'type',
  label: 'Type',
  icon: 'el-icon-document',
  type: 'select',
  values: [{
    label: 'Earn',
    value: 'Earn',
  }, {
    label: 'Burn',
    value: 'Burn',
  }, ]
}, {
  attribute: 'startAt',
  label: 'Start At',
  icon: 'el-icon-date',
  type: 'date'
}, {
  attribute: 'finishAt',
  label: 'Finish At',
  icon: 'el-icon-date',
  type: 'date'
}, {
  attribute: 'updatedAt',
  label: 'Last Updated',
  icon: 'el-icon-date',
  type: 'date'
}, {
  attribute: 'priority',
  label: 'Priority',
  icon: 'el-icon-date',
  type: 'numeric'
}, {
  attribute: 'eventRule',
  name: 'Event Rule',
  type: 'boolean',
  icon: 'el-icon-circle-check',
  booleanValues: {
    is_true: {
      label: 'Yes',
      value: true,
    },
    is_false: {
      label: 'No',
      value: false,
    },
  },
}, {
  attribute: 'provider',
  label: 'Provider Name',
  icon: 'el-icon-date',
  type: 'string'
}]

const TABLE_COLUMNS = [{
  name: 'createdAt',
  label: 'Date Created',
  icon: 'el-icon-date',
  format: {
    name: 'date',
    params: ['DD/MM/YYYY hh:mm A'],
  },
}, {
  name: 'id',
  label: 'Rule ID',
  type: 'string',
  icon: 'el-icon-document',
}, {
  name: 'name',
  label: 'Rule Name',
  type: 'string',
  icon: 'el-icon-document',
}, {
  name: 'type',
  label: 'Type',
  type: 'string',
  icon: 'el-icon-document',
}, {
  name: 'startAt',
  label: 'Start At',
  icon: 'el-icon-date',
  format: {
    name: 'date',
    params: ['DD/MM/YYYY hh:mm A'],
  },
}, {
  name: 'finishAt',
  label: 'Finish At',
  icon: 'el-icon-date',
  format: {
    name: 'date',
    params: ['DD/MM/YYYY hh:mm A'],
  },
}, {
  name: 'updatedAt',
  label: 'Last Updated',
  icon: 'el-icon-date',
  format: {
    name: 'date',
    params: ['DD/MM/YYYY hh:mm A'],
  },
}, {
  name: 'priority',
  label: 'Priority',
  type: 'string',
  icon: 'el-icon-document',
  format: value => value < 10 ? `0${ value }` : value,
}, {
  name: 'eventRule',
  label: 'Event Rule',
  icon: 'el-icon-document',
  type: 'boolean',
  format: value => value ? 'Yes' : 'No',
}, {
  name: 'provider',
  label: 'Provider Name',
  type: 'string',
  icon: 'el-icon-document',
}, ]

export default function (component) {
  return {
    processor: new MockProcessor({
      component,
      mockFrom: 'rules',
    }),
    // processor: new ApiProcessor({
    //   component,
    //   path: 'rules',
    // }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
