<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import { formatDate } from '@lib/utils/format-date'
import EditLayout from '../../components/edit-layout/edit-layout'
import RemoveModal from './remove-offer-modal'
import UpdateModal from './update-offer-modal'
import isPast from '@lib/utils/date-is-past'

export default {
  name: 'Offer',
  components: {
    RemoveModal,
    UpdateModal,
    EditLayout,
  },
  data() {
    return {
      isEdit: this.$route.params.edit,
      loading: true,
      offer: {},
      feedMerchant: null,
      modals: {
        remove: false,
        update: false,
      },
      fields: [
        {
          changed: false,
          key: 'name',
          label: 'Offer Name',
          path: 'name',
          component: 'el-input',
          rules: [{ required: true, message: 'Offer name is required' }],
        },
        {
          changed: false,
          key: 'description',
          label: 'Descriptions',
          path: 'description',
          component: 'el-input',
          componentBindings: {
            type: 'textarea',
            rows: 3,
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
          changed: false,
          key: 'code',
          label: 'Coupon Code',
          path: 'feed_offer.map.code',
          rules: [{ required: true, message: 'Coupon Code name is required' }],
        },
        {
          changed: false,
          key: 'start_date',
          label: 'Start Date',
          path: 'feed_offer.map.start_date',
          format: this.formatDate,
        },
        {
          changed: false,
          key: 'end_date',
          label: 'End Date',
          path: 'feed_offer.map.end_date',
          format: this.formatDate,
        },
      ],
      feedOffers: [],
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    feedOffer() {
      return get(this.offer, 'feed_offer', {})
    },
    map() {
      return get(this.offer, 'feed_offer.map', {})
    },
    feedOfferId() {
      return get(this.feedOffer, 'id')
    },
    aggregator() {
      return get(this.offer, 'feed_offer.feed')
    },
    endDate() {
      return get(this.offer, 'feed_offer.map.end_date')
    },
    startDate() {
      return get(this.offer, 'feed_offer.map.start_date')
    },
    isRemove() {
      if (!this.endDate) {
        return true
      } else {
        return !isPast(this.endDate)
      }
    },
    back() {
      if (this.isEdit) {
        return {
          name: 'offer-details',
          params: {
            id: this.id,
            edit: null,
          },
        }
      } else {
        return {
          name: 'offers',
        }
      }
    },
  },
  watch: {
    offer() {
      this.feedOffers = [
        {
          title: this.aggregator,
          selected: false,
          updated: get(this.feedOffer, 'acknowledgement') === 'updated',
          items: {
            name: {
              selected: false,
              isSelectable: true,
              value: get(this.offer, 'feed_offer.map.name', '—'),
            },
            description: {
              selected: false,
              isSelectable: true,
              value: get(this.offer, 'feed_offer.map.description', '—'),
            },
            terms: {
              selected: false,
              isSelectable: true,
              value: get(this.offer, 'feed_offer.map.terms', '—'),
            },
          },
        },
      ]
      this.loading = false
    },
    $route(route) {
      if (!route.params.edit) {
        this.isEdit = false
      }
    },
  },
  async created() {
    const [, globalOffer] = await this.getGlobalOffer(this.id)

    if (globalOffer) {
      const feedMerchId = globalOffer.feed_offer.merchant_external_id
      const [, feedMerchant] = await this.getFeedMerchant({
        merchantId: feedMerchId,
      })

      this.offer = globalOffer
      this.feedMerchant = feedMerchant
    }
  },
  async mounted() {
    // parse url
    this.offer.tracking_url = get(this.offer, 'baseline_url', '')
  },
  methods: {
    ...mapActions('offers', [
      'getGlobalOffer',
      'updateGlobalOffer',
      'deleteGlobalOffer',
    ]),
    ...mapActions('feedOffers', ['activateFeedOffer']),
    ...mapActions('feedMerchants', ['getFeedMerchant']),
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
    async onSwitch() {
      this.updateGlobalOffer({
        id: this.id,
        payload: {
          enabled: this.offer.enabled,
        },
      }).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Status successfully changed to ${
            this.offer.enabled ? 'enabled' : 'disabled'
          }`,
        })
      })
    },
    async submitUpdateOffer(notes) {
      this.modals.update = false

      const payload = {}
      const changedFields = this.fields.filter(field => field.changed)

      for (const field of changedFields) {
        payload[field.key] = field.value
        field.changed = false
      }

      const [error, response] = await this.updateGlobalOffer({
        id: this.id,
        payload,
      })

      if (error) {
        console.error(error)
        return
      }

      this.onEdit(false)
      this.offer = response
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Offer details updated successfully.',
      })
      await this.activateFeedOffer({
        feedOfferId: this.feedOfferId,
        payload: { acknowledgement: 'acknowledged' },
      })
    },
    async submitDeleteOffer(notes) {
      this.modals.remove = false
      // TODO: send notes
      const [error] = await this.deleteGlobalOffer(this.id)

      if (error) {
        console.error(error)
        return
      }

      this.$router.push('/offers')
      this.$notify({
        type: 'info',
        title: 'Deleted',
        message: 'Offer deleted successfully.',
      })
    },
    async onEdit(value) {
      this.isEdit = value
      await this.$nextTick()
      if (this.isEdit) {
        this.$router.push({
          name: 'offer-details',
          params: { edit: 'edit' },
        })
      }
    },
  },
}
</script>

<template>
  <main-layout
    :title="offer.name"
    :back="back"
    :loading="loading"
  >
    <edit-layout
      v-if="isEdit"
      :source="offer"
      :fields="fields"
      :presets="feedOffers"
      :is-remove="isRemove"
      @cancel="onEdit(false)"
      @update="modals.update = true"
      @remove="modals.remove = true"
    >
      <template #removeButton>
        <span>Remove Offer</span>
      </template>
      <template #updateButton>
        <span>Update Offer</span>
      </template>
    </edit-layout>
    <el-card v-else>
      <div
        slot="header"
        :class="$style.header"
      >
        <span>
          General Information
        </span>
        <el-button
          type="primary"
          icon="el-icon-edit"
          circle
          @click="onEdit(true)"
        />
      </div>

      <div @click="onSwitch">
        <el-switch
          v-model="offer.enabled"
          active-text="Active"
        />
      </div>

      <div>
        <dl :class="['datalist', $style.list]">
          <dt>Offer Aggregator</dt>
          <dd>{{ aggregator || '-' }}</dd>

          <template v-if="feedMerchant">
            <dt>Aggregator Feed Merchant</dt>
            <dd>{{ feedMerchant.map.name }}</dd>

            <dt>Merchant Updated</dt>
            <dd>{{ formatDate(feedMerchant.updated_at) || '-' }}</dd>
          </template>

          <dt>Offer ID</dt>
          <dd>{{ offer.id || '-' }}</dd>

          <dt>Offer Ext ID</dt>
          <dd>{{ feedOffer.external_id || '-' }}</dd>

          <dt>Offer Created at</dt>
          <dd>
            {{ formatDate(offer.created_at, 'DD/MM/YYYY hh:mm A') || '-' }}
          </dd>

          <dt>Offer Updated</dt>
          <dd>
            {{ formatDate(offer.updated_at, 'DD/MM/YYYY hh:mm A') || '-' }}
          </dd>

          <dt>Offer Name</dt>
          <dd>{{ offer.name || '-' }}</dd>

          <dt>Coupon Code</dt>
          <dd>{{ map.code || '-' }}</dd>

          <dt>Offer Starts</dt>
          <dd>{{ formatDate(map.start_date) || '-' }}</dd>

          <dt>Offer Ends</dt>
          <dd>{{ formatDate(map.end_date) || '-' }}</dd>

          <dt>Description</dt>
          <dd>{{ offer.description || '-' }}</dd>

          <dt>Terms & Conditions</dt>
          <dd>{{ offer.terms || '-' }}</dd>
        </dl>
      </div>
    </el-card>
    <remove-modal
      v-if="modals.remove"
      :visible.sync="modals.remove"
      @submit="submitDeleteOffer"
    />
    <update-modal
      v-if="modals.update"
      :visible.sync="modals.update"
      :fields="fields"
      @submit="submitUpdateOffer"
    />
  </main-layout>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list {
  flex: 1 0 50%;
  margin-top: 1.8rem;

  dt {
    color: black;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}
</style>
