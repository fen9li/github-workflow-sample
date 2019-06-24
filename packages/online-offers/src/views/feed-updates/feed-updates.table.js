import MerchantDialog from './feed-merchant-dialog-container.vue'
import OfferActivate from './feed-offer-activate.vue'

const TABLE_FILTERS_MERCHANTS = [
  {
    attribute: 'name',
    label: 'Merchant',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'created_at',
    label: 'Date created',
    type: 'date',
    icon: 'el-icon-date',
  },
]

const TABLE_FILTERS_OFFERS = [
  {
    attribute: 'name',
    label: 'Merchant',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'enabled',
    label: 'Enabled',
    type: 'string',
    icon: 'el-icon-document',
  },
  {
    attribute: 'created_at',
    label: 'Date created',
    type: 'date',
    icon: 'el-icon-date',
  },
]

const TABLE_COLUMNS_MERCHANTS = [
  {
    name: 'name',
    label: 'Merchant Name',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'merchant.name',
    label: 'Global Merchant',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'created_at',
    label: 'Date created',
    icon: 'el-icon-date',
    format: 'date',
    width: 200,
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 180,
    component: (_, __, { row }) => ({
      is: MerchantDialog,
      props: { row },
    }),
  },
]

const TABLE_COLUMNS_OFFERS = [
  {
    name: 'name',
    label: 'Merchant Name',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'payload.offerdescription',
    label: 'Offer description',
    icon: 'el-icon-document',
    width: 300,
  },
  {
    name: 'created_at',
    label: 'Date created',
    icon: 'el-icon-date',
    format: 'date',
  },
  {
    sortable: false,
    overflowTooltip: false,
    width: 180,
    component: (_, __, { row }) => ({
      is: OfferActivate,
      props: { row },
    }),
  },
]

export default {
  merchants: {
    filters: TABLE_FILTERS_MERCHANTS,
    columns: TABLE_COLUMNS_MERCHANTS,
  },
  offers: {
    filters: TABLE_FILTERS_OFFERS,
    columns: TABLE_COLUMNS_OFFERS,
  },
  processor: null,
}
