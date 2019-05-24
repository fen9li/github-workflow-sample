const TABLE_FILTERS = [
  {
    attribute: 'name',
    label: 'name',
    type: 'string',
    icon: 'el-icon-document',
  },
]


// "id": "rol_lMToSV56ClT65sCg",
//   "name": "super-admin",
//   "description": "Super admin role - GOD mode"

const TABLE_COLUMNS = [
  {
    name: 'id',
    label: 'ID',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Name',
    icon: 'el-icon-document',
  },
  {
    name: 'description',
    label: 'Description',
    icon: 'el-icon-document',
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
