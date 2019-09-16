import MerchantDialog from './feed-merchant-dialog-container.vue'
import OfferActivate from './feed-offer-activate.vue'

const TABLE_FILTERS_MERCHANTS = [{
  attribute: 'name',
  label: 'Merchant',
  type: 'string',
  icon: 'el-icon-document',
}, {
  attribute: 'updated_at',
  label: 'Last Updated',
  type: 'date',
  icon: 'el-icon-date',
}, {
  attribute: 'status',
  label: 'Status',
  icon: 'el-icon-circle-check',
  type: 'boolean',
  booleanValues: {
    is_true: {
      label: 'Enabled',
      value: 'active',
    },
    is_false: {
      label: 'Disabled',
      value: 'inactive',
    },
  },
},]

const TABLE_FILTERS_OFFERS = [{
  attribute: 'name',
  label: 'Merchant',
  type: 'string',
  icon: 'el-icon-document',
}, {
  attribute: 'status',
  type: 'boolean',
  icon: 'el-icon-document',
}, {
  attribute: 'updated_at',
  label: 'Last Updated',
  type: 'date',
  icon: 'el-icon-date',
}]

const TABLE_COLUMNS_MERCHANTS = [{
  name: 'map.name',
  label: 'Merchant Name',
  icon: 'el-icon-document',
  width: 300,
}, {
  name: 'merchant.name',
  label: 'Global Merchant',
  icon: 'el-icon-document',
  width: 300,
}, {
  name: 'updated_at',
  label: 'Last Updated',
  icon: 'el-icon-date',
  format: 'date',
  width: 200,
}, {
  name: 'status',
  label: 'Status',
  icon: 'el-icon-circle-check',
  format: value => {
    return value === 'active' ? 'Enabled' : 'Disabled'
  },
  component: {
    is: 'cell-status',
    props: {
      styleObj(val) {
        if (val === 'active') {
          return { color: '#0fbd1c' }
        } else {
          return { color: '#909399' }
        }
      },
    },
  },
}, {
  sortable: false,
  overflowTooltip: false,
  width: 180,
  fixed: 'right',
  component: (_, __, {
    row,
  }) => ({
    is: MerchantDialog,
    props: {
      row,
    },
  }),
}]

const TABLE_COLUMNS_OFFERS = [{
  name: 'name',
  label: 'Merchant Name',
  icon: 'el-icon-document',
  width: 200,
}, {
  name: 'map.name',
  label: 'Offer Name',
  icon: 'el-icon-document',
  width: 300,
}, {
  name: 'updated_at',
  label: 'Last Updated',
  icon: 'el-icon-date',
  format: 'date',
  width: 100,
}, {
  sortable: false,
  overflowTooltip: false,
  width: 100,
  component: (_, __, {
    row,
  }) => ({
    is: OfferActivate,
    props: {
      row,
    },
  }),
}]

export default {
  processor: null,
  merchants: {
    filters: TABLE_FILTERS_MERCHANTS,
    columns: TABLE_COLUMNS_MERCHANTS,
    tableName: 'feed-update-merchants'
  },
  offers: {
    filters: TABLE_FILTERS_OFFERS,
    columns: TABLE_COLUMNS_OFFERS,
    tableName: 'feed-update-offers'
  },
}
