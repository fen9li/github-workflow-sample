import ElasticProcessor from '@lib/processors/elastic-processor'
import { activeByDate } from '@lib/utils/date-helper'

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
    icon: 'el-icon-document',
    type: 'date',
  },
  {
    attribute: 'id',
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
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'useCount',
    label: 'No. in Use',
    type: 'numeric',
    icon: 'el-icon-document',
  },
  {
    attribute: 'amount',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'status',
    type: 'select',
    icon: 'el-icon-document',
    values: [
      {
        label: 'Active',
        value: 'Active',
      },
      {
        label: 'Inactive',
        value: 'Inactive',
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
    name: 'name',
    label: 'Coupon Name',
    icon: 'el-icon-document',
  },
  {
    name: 'code',
    label: 'Coupon Code',
    icon: 'el-icon-document',
  },
  {
    name: 'startAt',
    label: 'Effective Start Date',
    icon: 'el-icon-document',
    format: 'date',
  },
  {
    name: 'endAt',
    label: 'End Date',
    icon: 'el-icon-document',
    format: 'date',
  },
  {
    name: 'validityPeriod',
    label: 'Validity Period',
    icon: 'el-icon-document',
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
    icon: 'el-icon-document',
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'capital',
    icon: 'el-icon-document',
    component: {
      props: {
        format(_, row) {
          return row.discountAbsolute ? `$${row.discountAbsolute.total}` : `${row.discountPercentage}%`
        },
      },
    },
  },
  {
    name: 'status',
    label: 'Status',
    format: 'capital',
    icon: 'el-icon-document',
    component: {
      is: 'cell-activity',
      props: {
        value: (_, row) => {
          return activeByDate(row.startAt, row.endAt) ? 'active' : 'inactive'
        }
      }
    },
  },
]

export default function(component){
  return {
    processor: new ElasticProcessor({
      component,
      index: 'coupons',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
