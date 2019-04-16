const TABLE_FILTERS = [
  {
    attribute: 'created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'code',
    type: 'string',
  },
  {
    attribute: 'name',
    label: 'Product Name',
    type: 'string',
  },
  {
    attribute: 'prorataAnchor',
    label: 'Effective Start Date',
    type: 'date',
  },
  {
    attribute: 'endDate',
    label: 'End Date',
    type: 'date',
  },
  {
    attribute: 'plans',
    type: 'numeric',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created',
    label: 'Date created',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'externalId',
    label: 'Code',
    format: 'uppercase',
    width: 140,
  },
  {
    name: 'name',
    label: 'Product Name',
  },
  {
    name: 'billingType',
    label: 'Class',
  },
  {
    name: 'prorataAnchor',
    label: 'Effective Start Date',
    format: 'dateTime',
  },
  {
    name: 'endDate',
    label: 'End Date',
    format: 'dateTime',
  },
  {
    name: 'productCount',
    label: 'Plans',
    width: 80,
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
