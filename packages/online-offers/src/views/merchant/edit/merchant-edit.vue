<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import capitalize from 'lodash/capitalize'
import MerchantRemoveModal from './modals/merchant-remove'
import MerchandUpdateModal from './modals/merchant-update'
import EditLayout from '../../../components/edit-layout/edit-layout'
import Vue from 'vue'

export default {
  name: 'MerchantEdit',
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
      progress: false,
    }
  },
  computed: {
    feed() {
      return get(this.feeds[0], 'map.feed', '')
    },
    commissions() {
      const commissions = []

      for (const feed of this.feeds) {
        commissions.push(this.commissionForFeed(feed))
      }

      return commissions
    },
    fields() {
      return Vue.observable([
        {
          changed: false,
          key: 'name',
          label: 'Merchant name',
          path: 'name',
          component: 'el-input',
          rules: [{ required: true, message: 'Merchant name is required' }],
        },
        {
          changed: false,
          key: 'logo',
          label: 'Merchant Image',
          path: 'logo',
          component: 'edit-layout-image',
          rules: [{ required: true, message: 'Merchant logo is required' }],
        },
        {
          changed: false,
          key: 'summary',
          label: 'Summary',
          path: 'summary',
          component: 'el-input',
          componentBindings: {
            type: 'textarea',
            rows: 3,
          },
        },
        {
          changed: false,
          key: 'website',
          label: 'Merchant Website',
          path: 'website',
          rules: [{ required: true, message: 'Website url is required' }],
          component: 'el-input',
          componentSlots: [
            {
              name: 'prepend',
            },
          ],
        },
        {
          changed: false,
          key: 'categories',
          label: 'Classification',
          path: 'categories',
          rules: [{ required: true, message: 'Classification is required' }],
          component: 'edit-layout-categories',
          componentBindings: {
            categories: this.categories,
          },
        },
        {
          changed: false,
          key: 'terms',
          label: 'Terms & Conditions',
          path: 'terms',
          rules: [{ required: true, message: 'Terms is required' }],
          component: 'el-input',
          componentBindings: {
            type: 'textarea',
            rows: 3,
          },
        },
        {
          type: 'divider',
          slot: 'footerTitle',
        },
        {
          changed: false,
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
            },
            values: this.commissions,
          },
        },
      ])
    },
    feedOffers() {
      const { commissions } = this
      const feedOffers = []

      this.feeds.forEach(feed => {
        const feedCategories = get(feed, 'map.categories', [])
        let categoriesLabel = '—'

        if (feedCategories.length) {
          categoriesLabel = feedCategories.join(', ')
        }

        const feedObject = {
          title: get(feed, 'map.feed'),
          selected: false,
          updated: get(feed, 'acknowledgement') === 'updated',
          items: {
            name: {
              selected: false,
              isSelectable: true,
              value: get(feed, 'map.name', '-'),
            },
            website: {
              selected: false,
              isSelectable: true,
              value: get(feed, 'map.website', '-'),
            },
            logo: {
              selected: false,
              isSelectable: true,
              value: get(feed, 'map.logo', '-'),
              preview: 'image',
            },
            summary: {
              selected: false,
              isSelectable: true,
              value: get(feed, 'map.summary', '-'),
            },
            categories: {
              selected: false,
              isSelectable: false,
              value: feedCategories,
              label: categoriesLabel,
              type: 'text',
            },
            terms: {
              selected: false,
              isSelectable: true,
              value: get(feed, 'map.terms', '-'),
            },
          },
        }

        if (commissions.length > 1) {
          feedObject.items.commission = {
            selected: false,
            isSelectable: true,
            component: 'edit-layout-table',
            value: feed.external_id,
            label: false,
            componentBindings: {
              labels: {
                base: 'Base',
                min: 'Min',
                max: 'Max',
                type: 'Commission Type',
              },
              values: commissions,
            },
          }
        }

        feedOffers.push(feedObject)
      })

      return Vue.observable(feedOffers)
    },
  },
  created() {
    this.updateFeedMerchantsAck()
  },
  methods: {
    ...mapActions('merchants', [
      'updateGlobalMerchant',
      'deleteGlobalMerchant',
    ]),
    ...mapActions('feedMerchants', [
      'activateFeedMerchant',
      'setDefaultFeedMerchant',
    ]),
    formatCommissionType(type) {
      return capitalize(type)
    },
    formatCommissionValue(type, value) {
      if (!value) {
        return '-'
      }

      if (type === 'PERCENTAGE') {
        return `${value}%`
      }

      return `$${value}`
    },
    commissionForFeed(feed) {
      return {
        key: get(feed, 'map.feed'),
        id: get(feed, 'external_id'),
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
          url: {},
        },
      }
    },
    async submitUpdate(notes) {
      this.progress = true

      const payload = {}
      const changedFields = this.fields.filter(field => field.changed)

      for (const field of changedFields) {
        const { key, value } = field

        if (key === 'categories') {
          payload[key] = value.map(el => el.id)
        } else if (key === 'commission') {
          const newCommissionFeed = this.feeds.find(f => (f.feed = value))
          const feedMerchantId = newCommissionFeed.id

          this.setDefaultFeedMerchant({
            merchantId: this.$route.params.id,
            feedMerchantId: feedMerchantId,
          })
        } else {
          payload[key] = value
        }

        field.changed = false
      }

      this.updateGlobalMerchant({
        merchantId: this.merchant.id,
        payload,
      }).then(response => {
        this.progress = false
        const [error, success] = response
        if(error) {
          if(error.violations) {
            const violations = Object.keys(error.violations)
            violations.forEach(violation => {
              setTimeout(() => {
                this.$notify({
                  type: 'error',
                  title: `Unable to update merchant details`,
                  message: `${violation}: ${error.violations[violation][0]}`,
                })
              }, 50)
            })
          } else {
            this.$notify({
              type: 'error',
              title: `Unable to update merchant details`,
              message: error.message,
            })
          }
        } else {
          this.modals.update = false
          this.$emit('cancel')
          this.$emit('update', success)
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `Merchant details updated successfully`,
          })
        }
      })
    },
    async submitDelete(notes) {
      this.modals.remove = false
      // TODO: send notes
      const [error] = await this.deleteGlobalMerchant({
        merchantId: this.merchant.id,
      })

      if(error) {
        if(error.violations) {
          const violations = Object.keys(error.violations)
          violations.forEach(violation => {
            setTimeout(() => {
              this.$notify({
                type: 'error',
                title: `Unable to delete global merchant`,
                message: `${violation}: ${error.violations[violation][0]}`,
              })
            }, 50)
          })
        } else {
          this.$notify({
            type: 'error',
            title: `Unable to delete global merchant`,
            message: error.message,
          })
        }
      } else {
        this.$router.push('/merchants')
        this.$notify({
          type: 'info',
          title: 'Deleted',
          message: 'Global merchant deleted successfully.',
        })
      }
    },
    updateFeedMerchantsAck() {
      this.feeds.forEach(({ id }) =>
        this.activateFeedMerchant({
          feedmerchantId: id,
          payload: { acknowledgement: 'acknowledged' },
        })
      )
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
      <template #footerTitle="{slotStyles}">
        <div
          :class="$style.editFooterTitle"
          :style="slotStyles"
        >
          <div>Commission Tracking Details</div>
          <div :class="$style.editFooterActive">
            Active: {{ feed }}
          </div>
        </div>
      </template>
      <template #removeButton>
        <span>Delete Global Merchant</span>
      </template>
      <template #updateButton>
        <span>Save Changes</span>
      </template>
    </edit-layout>

    <merchand-update-modal
      v-if="modals.update"
      :visible.sync="modals.update"
      :fields="fields"
      :progress="progress"
      @submit="submitUpdate"
    />

    <merchant-remove-modal
      v-if="modals.remove"
      :visible.sync="modals.remove"
      :progress="progress"
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
