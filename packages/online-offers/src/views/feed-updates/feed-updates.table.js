import ApiProcessor from '@lib/processors/api-processor'
import MerchantDialog from '../feed-update/feed-merchant-dialog-container.vue'
import OfferActivate from '../feed-update/feed-offer-activate.vue'

const TABLE_FILTERS = [
  {
    attribute: 'action',
    label: 'Update',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'merchant',
    label: 'Merchant',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'feed',
    label: 'Feed',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'create_at',
    label: 'Date Created',
    icon: 'el-icon-date',
    type: 'date',
  },
]

const TABLE_COLUMNS = [
  {
    name: 'action',
    label: 'Update',
    icon: 'el-icon-document',
  },
  {
    name: 'merchant',
    label: 'Merchant',
    icon: 'el-icon-document',
  },
  {
    name: 'feed',
    label: 'Feed',
    icon: 'el-icon-document',
  },
  {
    name: 'created_at',
    label: 'Date Created',
    icon: 'el-icon-date',
    format: 'date',
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 100,
    component: (_, __, { row }) => {
      const { type } = row

      switch (type) {
        case 'merchant':
          return {
            is: MerchantDialog,
            props: {
              row,
            },
          }
        case 'offer':
          return {
            is: OfferActivate,
            props: {
              row,
            },
          }
        default:
          return {}
      }
    },
  },
]

export default component => ({
  processor: new ApiProcessor({ component, path: '/feeds/logs' }),
  filters: TABLE_FILTERS,
  columns: TABLE_COLUMNS,
})
