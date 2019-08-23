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
    label: 'Product Name',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'id',
    label: 'Product Code',
    icon: 'el-icon-document',
    type: 'string',
  },
  {
    attribute: 'price.total',
    label: 'Amount',
    icon: 'el-icon-document',
    type: 'numeric',
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
    attribute: 'end',
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
    name: 'name',
    label: 'Product Name',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'id',
    label: 'Product Code',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'price.total',
    label: 'Amount',
    icon: 'el-icon-document',
    format: 'dollar',
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
    name: 'status',
    label: 'Status',
    icon: 'el-icon-document',
    format: 'capital',
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
      index: 'single-products',
    }),
    filters: TABLE_FILTERS,
    columns: TABLE_COLUMNS,
  }
}
