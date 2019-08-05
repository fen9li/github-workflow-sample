import ApiProcessor from '@lib/processors/api-processor'
import MerchantDialog from '../feed-update/feed-merchant-dialog-container.vue'
import OfferActivate from '../feed-update/feed-offer-activate.vue'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'

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
    format(_, row) {
      const { type, action } = row

      switch (action) {
        case 'create':
          return `New ${type}`
        case 'update':
          return `${capitalize(type)} update`
        default:
          return `Deleted ${type}`
      }
    },
    component: {
      props: {
        styleObj(_, row) {
          const { action } = row

          switch (action) {
            case 'create':
              return { color: '#29d737' }
            case 'update':
              return {}
            default:
              return { color: '#fc7168' }
          }
        },
      },
    },
  },
  {
    name: 'feed_merchant.map.name',
    label: 'Merchant',
    icon: 'el-icon-document',
    format(_, row) {
      const { type } = row

      if (type === 'offer') {
        return get(row, 'feed_offer.feed_merchant.map.name', '')
      } else if (type === 'merchant') {
        return get(row, 'feed_merchant.map.name', '')
      } else {
        throw new Error(`Wrong record type: ${type}`)
      }
    },
  },
  {
    name: 'feed',
    label: 'Feed',
    icon: 'el-icon-document',
    format(_, row) {
      const { type } = row

      if (type === 'offer') {
        return get(row, 'feed_offer.map.feed', '')
      } else if (type === 'merchant') {
        return get(row, 'feed_merchant.map.feed', '')
      } else {
        throw new Error(`Wrong record type: ${type}`)
      }
    },
  },
  {
    name: 'updated_at',
    label: 'Last Updated',
    icon: 'el-icon-date',
    format: 'date',
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 100,
    fixed: 'right',
    component: (_, __, { row }) => {
      const { type } = row

      switch (type) {
        case 'merchant':
          return {
            is: MerchantDialog,
            props: {
              row: row.feed_merchant,
            },
          }
        case 'offer':
          return {
            is: OfferActivate,
            props: {
              row: row.feed_offer,
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
