import ElasticProcessor from '@lib/processors/elastic-processor'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'id',
    type: 'string',
    label: 'Customer ID',
    icon: 'el-icon-s-custom',
  },
  {
    attribute: 'firstName',
    type: 'string',
    icon: 'el-icon-user',
  },
  {
    attribute: 'preferredName',
    type: 'string',
    icon: 'el-icon-user',
  },
  {
    attribute: 'lastName',
    type: 'string',
    icon: 'el-icon-user',
  },
  {
    attribute: 'email',
    type: 'string',
    icon: 'el-icon-message',
  },
  {
    attribute: 'phoneNumbers',
    label: 'Telephone',
    type: 'string',
    icon: 'el-icon-phone',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-circle-check',
    values: [
      {
        label: 'Active',
        value: 'Active',
      },
      {
        label: 'Inactive',
        value: 'Inactive',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Сreated',
    icon: 'el-icon-date',
    format: {
      name: 'date',
      params: ['DD/MM/YYYY hh:mm A'],
    },
    width: 160,
  },
  {
    name: 'id',
    label: 'Customer ID',
    type: 'string',
    icon: 'el-icon-s-custom',
    width: 140,
  },
  {
    name: 'firstName',
    type: 'string',
    icon: 'el-icon-user',
    width: 140,
  },
  {
    name: 'preferredName',
    type: 'string',
    icon: 'el-icon-user',
    width: 140,
  },
  {
    name: 'lastName',
    type: 'string',
    icon: 'el-icon-user',
    width: 140,
  },
  {
    name: 'email',
    type: 'string',
    icon: 'el-icon-message',
    width: 200,
  },
  {
    name: 'phoneNumbers[0]',
    label: 'Telephone',
    type: 'string',
    icon: 'el-icon-phone',
    width: 140,
  },
  {
    name: 'status',
    label: 'Status',
    format: {
      name: 'capital',
    },
    icon: 'el-icon-circle-check',
    component: {
      is: 'cell-activity',
    },
    width: 120,
  },
]

export default function(component) {
  return {
    processor: new ElasticProcessor({
      component,
      index: 'customers',
      query: {
        sort: { createdAt: { order: 'desc' } }
      }
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
