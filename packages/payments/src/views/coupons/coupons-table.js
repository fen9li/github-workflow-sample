import ElasticProcessor from '@lib/processors/elastic-processor'
import { activeByDate } from '@lib/utils/date-helper'
import { datesStatusSorting } from '@lib/utils/custom-table-sortings'

const TABLE_FILTERS = [
  {
    attribute: 'createdAt',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'name',
    label: 'Coupon Name',
    icon: 'el-icon-reading',
    type: 'string',
  },
  {
    attribute: 'code',
    label: 'Coupon Code',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'startAt',
    label: 'Effective Start Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'endAt',
    label: 'End Date',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'validityPeriod',
    label: 'Validity Period',
    type: 'numeric',
    icon: 'el-icon-date',
    customFiltering: {
      name: 'validityPeriod',
      label: function(v) { return v === 1 ? `${v} Month` : `${v} Months` },
    },
  },
  {
    attribute: 'useCount',
    label: 'No. in Use',
    type: 'numeric',
    icon: 'el-icon-files',
  },
  {
    attribute: 'amount',
    type: 'numeric',
    icon: 'el-icon-money',
  },
  {
    attribute: 'end',
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
    name: 'name',
    label: 'Coupon Name',
    icon: 'el-icon-reading',
  },
  {
    name: 'code',
    label: 'Coupon Code',
    icon: 'el-icon-document',
  },
  {
    name: 'startAt',
    label: 'Effective Start Date',
    icon: 'el-icon-date',
    format: 'date',
  },
  {
    name: 'endAt',
    label: 'End Date',
    icon: 'el-icon-date',
    format: 'date',
  },
  {
    name: 'validityPeriod',
    label: 'Validity Period',
    icon: 'el-icon-date',
    format: 'capital',
    component: {
      props: {
        format(value) {
          const count = parseInt(value.replace(/[^\d]/g, ''))

          if (value) {
            return `${count} ${count === 1 ? 'Month' : 'Months'}`
          } else return ''
        },
      },
    },
  },
  {
    name: 'useCount',
    label: 'No. in Use',
    icon: 'el-icon-files',
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'capital',
    icon: 'el-icon-money',
    component: {
      props: {
        format(_, row) {
          return row.discountAbsolute ? `$${row.discountAbsolute.total}` : `${row.discountPercentage}%`
        },
      },
    },
  },
  {
    name: 'end',
    label: 'Status',
    format: 'capital',
    icon: 'el-icon-circle-check',
    component: {
      is: 'cell-activity',
      props: {
        value: (_, row) => {
          return activeByDate(row.startAt, row.endAt) ? 'active' : 'inactive'
        }
      }
    },
    sorting: datesStatusSorting,
  },
]

export default function(component){
  return {
    processor: new ElasticProcessor({
      component,
      index: 'coupons',
      query: {
        sort: {
          createdAt: { order: 'desc' }
        }
      }
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
