const TABLE_FILTERS = [
  {
    attribute: 'name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'identifier',
    type: 'string',
    icon: 'el-icon-document',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'id',
    label: 'ID',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'name',
    label: 'Name',
    icon: 'el-icon-document',
  },
  {
    name: 'identifier',
    label: 'Identifier',
    icon: 'el-icon-document',
  },
  {
    name: 'allow_offline_access',
    label: 'Offline access',
    icon: 'el-icon-document',
  },
  {
    name: 'skip_consent_for_verifiable_first_party_clients',
    label: 'Skip consent',
    icon: 'el-icon-document',
  },
  {
    name: 'token_lifetime',
    label: 'Token lifetime',
    icon: 'el-icon-document',
  },
  {
    name: 'token_lifetime_for_web',
    label: 'Web token lifetime',
    icon: 'el-icon-document',
  },
  {
    name: 'signing_alg',
    label: 'Alg',
    icon: 'el-icon-document',
  },
  {
    name: 'enforce_policies',
    label: 'Enforce policies',
    icon: 'el-icon-document',
  },
  {
    name: 'token_dialect',
    label: 'Token dialect',
    icon: 'el-icon-document',
  },


]

export default {
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
