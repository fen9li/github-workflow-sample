// {
//   "email_verified": true,
//   "email": "iteam4u@ya.ru",
//   "updated_at": "2019-05-21T20:38:39.544Z",
//   "user_id": "auth0|5cae064ad36f86111805214b",
//   "name": "iteam4u@ya.ru",
//   "picture": "https://s.gravatar.com/avatar/a56e2a3d9b332f51a59e59d5e6516835?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fit.png",
//   "nickname": "iteam4u",
//   "identities": [
//   {
//     "user_id": "5cae064ad36f86111805214b",
//     "provider": "auth0",
//     "connection": "Username-Password-Authentication",
//     "isSocial": false
//   }
// ],
//   "created_at": "2019-04-10T15:05:46.904Z",
//   "last_login": "2019-05-21T20:38:39.544Z",
//   "last_ip": "35.204.109.146",
//   "logins_count": 99
// },

const TABLE_FILTERS = [
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
]

const TABLE_COLUMNS = [
  {
    name: 'picture',
    icon: 'el-icon-document',
    label: '',
    sortable: false,
    width: 10,
    component: {
      is: 'cell-user-avatar',
    },
  },
  {
    name: 'user_id',
    label: 'ID',
    icon: 'el-icon-document',
    width: 50,
  },
  {
    name: 'name',
    label: 'Name',
    icon: 'el-icon-document',
    width: 50,
  },
  {
    name: 'email',
    label: 'email',
    icon: 'el-icon-document',
  },
]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
