// import ApiProcessor from '@lib/processors/api-processor'
import MockProcessor from '@lib/processors/mock-processor'

const TABLE_FILTERS = [
  {
    attribute: 'created_at',
    label: 'Date Created',
    type: 'date',
    icon: 'el-icon-document',
  },
  {
    attribute: 'ProviderId',
    label: 'Provider ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'providerName',
    label: 'Provider Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'contractId',
    label: 'Contract ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'supplierId',
    label: 'Supplier ID',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'sku',
    label: 'SKU',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'brand',
    label: 'Brand',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'name',
    label: 'Product Name',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'updated_at',
    label: 'Last update',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'active',
    label: 'Status',
    icon: 'el-icon-document',
    type: 'select',
    values: [
      {
        label: 'Active',
        value: true
      },
      {
        label: 'Inactive',
        value: false
      }
    ]
  },
]

const TABLE_COLUMNS = [
  {
    name: 'created_at',
    label: 'Date Created',
    format: 'dateTime',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'providerId',
    label: 'Provider ID',
    icon: 'el-icon-document',
  },
  {
    name: 'providerName',
    label: 'Provider Name',
    icon: 'el-icon-document',
  },
  {
    name: 'contractId',
    label: 'Contract ID',
    icon: 'el-icon-document',
  },
  {
    name: 'supplierProductId',
    label: 'Supplier ID',
    icon: 'el-icon-document',
  },
  {
    name: 'supplierName',
    label: 'Supplier Name',
    icon: 'el-icon-document',
  },
  {
    name: 'sku',
    label: 'SKU',
    icon: 'el-icon-document',
  },
  {
    name: 'brand',
    icon: 'el-icon-document',
  },
  {
    name: 'name',
    label: 'Product Name',
    icon: 'el-icon-document',
  },
  {
    name: 'updated_at',
    label: 'Last Updated',
    format: 'dateTime',
    icon: 'el-icon-document',
    width: 100,
  },
  {
    name: 'availability.enabled',
    icon: 'el-icon-document',
    label: 'Status',
    format: 'capital',
    width: 90,
    component: {
      props: {
        styleObj(_, row) {
          return row.availability.enabled ? { color: '#29d737' } : { color: '#fc1e1e' }
        },
        badge(_, row) {
          return row.availability.enabled ? { name: 'el-icon-check', pos: 'left' } : { name: 'el-icon-close', pos: 'left' }
        },
        value(_, row) {
          return row.availability.enabled ? 'active' : 'inactive'
        }
      },
    },
  }
]

export default component => ({
  // processor: new ApiProcessor({ component, path: 'providers' }),
  processor: new MockProcessor({
    component,
    mockFrom: 'provider-products',
  }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
  tableName: 'provider-products'
})
