const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'id',
    label: 'Occurrence ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Event Name',
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
    attribute: 'value',
    label: 'Value',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'updatedAt',
    label: 'Last Updated',
    type: 'date',
    icon: 'el-icon-date',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [{
      label: 'Approved',
      value: 'approved',
    }, {
      label: 'Failed',
      value: 'failed',
    }, {
      label: 'Completed',
      value: 'completed',
    }, {
      label: 'Pending',
      value: 'pending',
    }, ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    format: 'dateTime',
    icon: 'el-icon-date',
    sortable: false,
    width: 100,
  },
  {
    name: 'id',
    label: 'Occurrence ID',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Event Name',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'type',
    label: 'Type',
    icon: 'el-icon-document',
    width: 120,
  },
  {
    name: 'value',
    label: 'Value',
    icon: 'el-icon-document',
    width: 160,
  },
  {
    name: 'updatedAt',
    label: 'Last Updated',
    format: 'dateTime',
    icon: 'el-icon-date',
    sortable: false,
    width: 100,
  },
  {
    name: 'status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      props: {
        allowEmpty: true,
        styleObj(val) {
          switch (val) {
            case 'approved':
              return { color: '#29d737' }
            case 'failed':
              return { color: '#fc1e1e' }
            case 'pending':
              return { color: '#fb972b' }
            case 'completed':
              return { color: '#a8a8a8' }
            default:
              return {}
          }
        },
        badge: val => {
          switch (val) {
            case 'approved':
            case 'completed':
              return { name: 'el-icon-check', pos: 'left' }
            case 'failed':
              return { name: 'el-icon-close', pos: 'left' }
            case 'pending':
              return { name: 'el-icon-minus', pos: 'left' }
            default:
              return {}
          }
        },
      },
    },
  },
]

export default {
  processor: null,
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'account-event-occurrences'
}
