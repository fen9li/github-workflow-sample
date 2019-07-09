<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import MerchantRemoveModal from './modals/merchant-remove'
import MerchandUpdateModal from './modals/merchant-update'
import EditLayout from '../../../components/edit-layout/edit-layout'

export default {
  name: 'MerchantDetailsEdit',
  components: {
    EditLayout,
    MerchantRemoveModal,
    MerchandUpdateModal,
  },
  props: {
    merchant: {
      type: Object,
      required: true,
    },
    feeds: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modals: {
        remove: false,
        update: false,
      },
    }
  },
  computed: {
    feed() {
      return get(this.feeds[0], 'map.feed', '')
    },
    commissions() {
      const commissions = []

      for (const feed of this.feeds) {
        commissions.push(this.comissionForFeed(feed))
      }

      return commissions
    },
    fields() {
      return [
        {
          key: 'name',
          label: 'Merchant name',
          path: 'name',
          component: 'el-input',
          rules: [
            { required: true, message: 'merchant name is required' },
          ],
        }, {
          key: 'logo',
          label: 'Merchant Image',
          path: 'logo',
          component: 'edit-layout-image',
          rules: [
            { required: true, message: 'merchant logo is required' },
          ],
        }, {
          key: 'summary',
          label: 'Summary',
          path: 'summary',
          component: 'el-input',
          componentBindings: {
            type: 'textarea',
            rows: 3,
          },
        }, {
          key: 'website',
          label: 'Merchant Website',
          path: 'website',
          rules: [
            { required: true, message: 'website url is required' },
          ],
          component: 'el-input',
          componentSlots: [
            {
              name: 'prepend',
            },
          ],
        }, {
          key: 'categories',
          label: 'Classification',
          path: 'categories',
          rules: [
            { required: true, message: 'classification is required' },
          ],
          component: 'edit-layout-categories',
          componentBindings: {
            categories: this.categories,
          },
        }, {
          key: 'terms',
          label: 'Terms & Conditions',
          path: 'terms',
          rules: [
            { required: true, message: 'terms is required' },
          ],
          component: 'el-input',
          componentBindings: {
            type: 'textarea',
            rows: 3,
          },
        }, {
          type: 'divider',
          slot: 'footerTitle',
        }, {
          key: 'commission',
          label: 'Commission Rate',
          path: 'commission',
          component: 'edit-layout-table',
          componentBindings: {
            labels: {
              base: 'Base',
              min: 'Min',
              max: 'Max',
              type: 'Commission Type',
              url: 'Merchant Tracking URL',
            },
            values: this.commissions,
          },
        },
      ]
    },
    feedOffers() {
      const feedOffers = []

      for (const feed of this.feeds) {
        const feedObject = {
          title: get(feed, 'map.feed'),
          selected: false,
          updated: get(this.merchant, 'feed_updated', false),
          items: {
            name: {
              selected: false,
              value: get(feed, 'map.name', '-'),
            },
            website: {
              selected: false,
              value: get(feed, 'map.website', '-'),
            },
            logo: {
              selected: false,
              value: get(feed, 'map.logo', '-'),
              preview: 'image',
            },
            summary: {
              selected: false,
              value: get(feed, 'map.summary', '-'),
            },
            categories: {
              selected: false,
              value: this.categories,
              label: this.categories.map(el => el.name).join(', '),
            },
            terms: {
              selected: false,
              value: get(feed, 'map.terms', '-'),
            },
          },
        }

        if (this.commissions.length > 1) {
          feedObject.commissions = this.comissionForFeed(feed)
        }

        feedOffers.push(feedObject)
      }

      return feedOffers
    },
  },
  methods: {
    ...mapActions('merchants', [
      'updateMerchant',
      'deleteMerchant',
    ]),
    formatCommissionType(type) {
      switch (type) {
        case 'PERCENTAGE':
          return 'Percents'
        case 'DOLLARS':
        default:
          return 'Dollars'
      }
    },
    formatCommissionValue(type, value) {
      switch (type) {
        case 'PERCENTAGE':
          return `${ value }%`
        case 'DOLLARS':
        default:
          return `$${ value }`
      }
    },
    comissionForFeed(feed) {
      return {
        key: get(feed, 'map.feed'),
        items: {
          base: {
            value: get(feed, 'map.commission.base', 0),
            format: this.formatCommissionValue,
          },
          min: {
            value: get(feed, 'map.commission.min', 0),
            format: this.formatCommissionValue,
          },
          max: {
            value: get(feed, 'map.commission.max', 0),
            format: this.formatCommissionValue,
          },
          type: {
            value: get(feed, 'map.commission.type', 'DOLLARS'),
            format: this.formatCommissionType,
          },
          url: {
          },
        },
      }
    },
    async submitUpdate(notes) {
      this.modals.update = false

      const payload = {}
      const changedFields = this.fields.filter(field => field.changed)

      for (const field of changedFields) {
        if (field.key === 'categories') {
          payload[field.key] = field.value.map(el => el.id)
        } else {
          payload[field.key] = field.value
        }
        field.changed = false
      }

      const [error, response] = await this.updateMerchant({
        merchantId: this.merchant.id,
        payload,
      })

      if (error) {
        console.error(error)
        return
      }

      this.$emit('cancel')
      this.$emit('update', response)
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Merchant details updated sussessfully.',
      })
    },
    async submitDelete(notes) {
      this.modals.remove = false
      // TODO: send notes
      const [error] = await this.deleteMerchant({
        merchantId: this.merchant.id,
      })

      if (error) {
        console.error(error)
        return
      }

      this.$router.push('/merchants')
      this.$notify({
        type: 'info',
        title: 'Deleted',
        message: 'Global merchant deleted successfully.',
      })
    },
  },
}
</script>

<template>
  <div>
    <edit-layout
      :source="merchant"
      :fields="fields"
      :presets="feedOffers"
      @cancel="$emit('cancel')"
      @update="modals.update = true"
      @remove="modals.remove = true"
    >
      <template slot="removeButton">
        <span>Delete Global Merchant</span>
      </template>
      <template slot="updateButton">
        <span>Save Changes</span>
      </template>
      <template
        v-slot:footerTitle="slotProps"
      >
        <div
          :class="$style.editFooterTitle"
          :style="slotProps.slotStyles"
        >
          <div>Commission Tracking Details</div>
          <div :class="$style.editFooterActive">
            Active: {{ feed }}
          </div>
        </div>
      </template>
    </edit-layout>
    <merchand-update-modal
      v-if="modals.update"
      :visible.sync="modals.update"
      :fields="fields"
      @submit="submitUpdate"
    />
    <merchant-remove-modal
      v-if="modals.remove"
      :visible.sync="modals.remove"
      @submit="submitDelete"
    />
  </div>
</template>

<style lang="scss" module>
.editFooterTitle {
  margin-top: rem(80px);
  margin-bottom: rem(50px);
  font-size: rem(20px);
  font-weight: bold;
}

.editFooterActive {
  margin-top: rem(5px);
  font-size: rem(14px);
  color: #14be21;
}
</style>
