const TABLE_FILTERS = [
  {
    attribute: 'resource_server_identifier',
    label: 'resource id',
    type: 'string',
    icon: 'el-icon-document',
  },
  // {
  //   attribute: 'email',
  //   type: 'string',
  //   icon: 'el-icon-document',
  // },
]

const TABLE_COLUMNS = [
  {
    name: 'permission_name',
    label: 'name',
    icon: 'el-icon-document',
  },
  {
    name: 'description',
    label: 'description',
    icon: 'el-icon-document',
  },
  {
    name: 'resource_server_name',
    label: 'resource',
    icon: 'el-icon-document',
  },
  {
    name: 'resource_server_identifier',
    label: 'resource id',
    icon: 'el-icon-document',
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
