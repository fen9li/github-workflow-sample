import ElasticProcessor from '@lib/processors/elastic-processor'
import isPast from '@lib/utils/date-is-past'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'id',
    label: 'Code',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'name',
    label: 'Product Name',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'billingType',
    label: 'Billing Cycle',
    icon: 'el-icon-document',
    type: 'select',
    values: [
      {
        label: 'Anniversary',
        value: 'anniversary'
      },
      {
        label: 'Prorata',
        value: 'prorata'
      }
    ]
  },
  {
    attribute: 'anchorAt',
    label: 'Anchor Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'sunsetAt',
    label: 'End Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'pricingPlanCount',
    label: 'Plans',
    icon: 'el-icon-document',
    type: 'numeric',
  },
  {
    attribute: 'sunset',
    label: 'Status',
    type: 'dateStatus',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Active',
        value: 'active',
      },
      {
        label: 'Inactive',
        value: 'inactive',
      },
    ],
  },
]

const TABLE_COLUMNS = [
  {
    name: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'id',
    label: 'Code',
    icon: 'el-icon-document',
    width: 140,
  },
  {
    name: 'name',
    label: 'Product Name',
    icon: 'el-icon-document',
  },
  {
    name: 'billingType',
    label: 'Billing Cycle',
    icon: 'el-icon-document',
    format: 'capital',
  },
  {
    name: 'anchorAt',
    label: 'Anchor Date',
    icon: 'el-icon-document',
    format: 'dayMonthShort',
  },
  {
    name: 'sunsetAt',
    icon: 'el-icon-document',
    label: 'End Date',
    format: 'date',
  },
  {
    name: 'pricingPlanCount',
    icon: 'el-icon-document',
    label: 'Plans',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
    component: {
      is: 'cell-activity',
      props: {
        value: (_, row) => {
          return row.sunsetAt && isPast(row.sunsetAt) ? 'inactive' : 'active'
        }
      }
    },
  },
]

export default function(component){
  return {
    processor: new ElasticProcessor({
      index: 'subscription-products',
      component,
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
