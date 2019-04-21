import UserAccessResend from './user-access-resend.vue'
import UserAccessEdit from './user-access-edit.vue'
import UserAccessDelete from './user-access-delete.vue'

const TABLE_FILTERS = [
  {
    attribute: 'created',
    type: 'date',
    icon: 'el-icon-document',
  },
  {
    attribute: 'externalId',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'email',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'role',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created',
    label: 'Created',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'externalId',
    label: 'User ID',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Name',
    icon: 'el-icon-document',
  },
  {
    name: 'email',
    label: 'Email',
    icon: 'el-icon-document',
  },
  {
    name: 'role',
    label: 'Role',
    icon: 'el-icon-document',
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 190,
    component: (_, __, { row }) => ({
      is: UserAccessResend,
      props: { row },
    }),
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 56,
    component: (_, __, { row }) => ({
      is: UserAccessEdit,
      props: { row },
    }),
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 56,
    component: (_, __, { row }) => ({
      is: UserAccessDelete,
      props: { row },
    }),
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    component: {
      props: {
        styleObj(val) {
          switch (val) {
            case 'Active': return { color: '#29d737' }
            case 'Inactive': return { color: '#bbb' }
            default: return {}
          }
        },
        badge(val) {
          switch (val) {
            case 'Active': return {
              name: 'el-icon-success',
              pos: 'left',
            }
            case 'Inactive': return {
              name: 'el-icon-error',
              pos: 'left',
            }
            default: return {}
          }
        },
      },
    },
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
