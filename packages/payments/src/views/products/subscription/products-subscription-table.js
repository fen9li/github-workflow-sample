import ElasticProcessor from '@lib/processors/elastic-processor'
import isPast from '@lib/utils/date-is-past'
import { datesStatusSorting } from '@lib/utils/custom-table-sortings'

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
    icon: 'el-icon-goods',
    type: 'string',
  },
  {
    attribute: 'billingType',
    label: 'Billing Cycle',
    icon: 'el-icon-refresh-right',
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
    icon: 'el-icon-files',
    type: 'numeric',
  },
  {
    attribute: 'sunset',
    label: 'Status',
    type: 'dateStatus',
    icon: 'el-icon-circle-check',
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
    icon: 'el-icon-date',
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
    icon: 'el-icon-goods',
  },
  {
    name: 'billingType',
    label: 'Billing Cycle',
    icon: 'el-icon-refresh-right',
    format: 'capital',
  },
  {
    name: 'anchorAt',
    label: 'Anchor Date',
    icon: 'el-icon-date',
    format: 'dayMonthShort',
  },
  {
    name: 'sunsetAt',
    icon: 'el-icon-date',
    label: 'End Date',
    format: 'date',
  },
  {
    name: 'pricingPlanCount',
    icon: 'el-icon-files',
    label: 'Plans',
  },
  {
    name: 'sunset',
    label: 'Status',
    icon: 'el-icon-circle-check',
    format: 'capital',
    component: {
      is: 'cell-activity',
      props: {
        value: (_, row) => {
          return row.sunsetAt && isPast(row.sunsetAt) ? 'inactive' : 'active'
        }
      }
    },
    sorting: datesStatusSorting,
  },
]

export default function(component){
  return {
    processor: new ElasticProcessor({
      index: 'subscription-products',
      component,
      query: {
        sort: {
          _script: datesStatusSorting('asc', 'sunset'),
          createdAt: { order: 'desc' }
        }
      }
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
