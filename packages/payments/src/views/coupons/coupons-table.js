import StaticProcessor from '@lib/processors/static-processor'
import couponsMock from '@tests/__fixtures__/coupons'

const TABLE_FILTERS = [
  {
    attribute: 'dateCreated',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'effectiveStartDate',
    icon: 'el-icon-date',
    type: 'date',
  },
  {
    attribute: 'couponName',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'couponCode',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'validityPeriod',
    type: 'string',
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
    name: 'dateCreated',
    label: 'Date Created',
    icon: 'el-icon-document',
    format: 'dateTime',
  },
  {
    name: 'couponName',
    label: 'Coupon Name',
    icon: 'el-icon-document',
  },
  {
    name: 'couponCode',
    label: 'Coupon Code',
    icon: 'el-icon-document',
  },
  {
    name: 'effectiveStartDate',
    label: 'Effective Start Date',
    icon: 'el-icon-document',
    format: 'date',
  },
  {
    name: 'endDate',
    label: 'End Date',
    icon: 'el-icon-document',
    format: 'date',
  },
  {
    name: 'validityPeriod',
    label: 'Validity Period',
    icon: 'el-icon-document',
  },
  {
    name: 'noInUse',
    label: 'No. in Use',
    icon: 'el-icon-document',
  },
  {
    name: 'amount',
    label: 'Amount',
    icon: 'el-icon-document',
  },
  {
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    component: {
      is: 'cell-activity',
    },
  },
]

export default function(component) {
  return {
    processor: new StaticProcessor({
      component,
      data: couponsMock.table,
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
