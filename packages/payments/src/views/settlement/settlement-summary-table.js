import StaticProcessor from '@lib/processors/static-processor'
import {
  details,
  table,
} from '@tests/__fixtures__/settlement-details-mock.js'

const TABLE_COLUMNS = [
  {
    name: 'name',
    label: '',
    sortable: false,
  },
  {
    name: 'count',
    label: 'Count',
    align: 'right',
    remWidth: 6,
  },
  {
    name: 'amount',
    label: 'Amount',
    format: 'dollar',
    align: 'right',
  },
  {
    name: 'fee',
    label: 'Fee',
    format: 'dollar',
    align: 'right',
    width: '150rem',
  },
  {
    name: 'net',
    label: 'NET',
    format: 'dollar',
    align: 'right',
  },
]


export default function(component) {
  return {
    details,
    processor: new StaticProcessor({
      component,
      data: table,
    }),
    columns: TABLE_COLUMNS,
  }
}
