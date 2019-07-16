import merchantsTable from './merchants.table.js'

const TABLE_FILTERS = []

const TABLE_COLUMNS = merchantsTable.linked.columns.map(c =>
  Object.assign({ sortable: false }, c)
)

export default {
  processor: null,
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
}
