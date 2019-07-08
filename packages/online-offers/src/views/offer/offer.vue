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
      isEdit: false,
      switcher: false,
      offer: {},
      modals: {
        remove: false,
        update: false,
      },
      fields: [
        {
          key: 'name',
          label: 'Offer Name',
          path: 'name',
          component: 'el-input',
          rules: [
            { required: true, message: 'offer name is required' },
          ],
        }, {
          key: 'description',
          label: 'Descriptions',
          path: 'description',
          component: 'el-input',
          componentBindings: {
            type: 'textarea',
            rows: 3,
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
          key: 'code',
          label: 'Coupon Code',
          path: 'feed_offer.map.code',
        }, {
          key: 'start_date',
          label: 'Start Date',
          path: 'feed_offer.map.start_date',
          format: this.formatDate,
        }, {
          key: 'end_date',
          label: 'End Date',
          path: 'feed_offer.map.end_date',
          format: this.formatDate,
        }, {
          key: 'tracking_url',
          label: 'Tracking URL',
          path: 'tracking_url',
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
  },
  watch: {
    offer(val) {
      this.feedOffers = [{
        title: this.aggregator,
        selected: false,
        updated: get(this.offer, 'feed_updated', false),
        items: {
          name: {
            selected: false,
            value: get(this.offer, 'feed_offer.map.name', '-'),
          },
          description: {
            selected: false,
            value: get(this.offer, 'feed_offer.map.description', '-'),
          },
          terms: {
            selected: false,
            value: get(this.offer, 'feed_offer.map.terms', '-'),
          },
        },
      }]
    },
  },
  async mounted() {
    this.offer = await this.getOffer(this.id)
    this.switcher = this.offer.enabled
    // parse url
    this.offer.tracking_url = get(this.offer, 'baseline_url', '')
    // const url = get(this.offer, 'baseline_url')
    // if (url) {
    //   const urlComponents = url.split('://')
    //   this.offer.tracking_url = {
    //     prepend: `${ urlComponents[0] }://`,
    //     value: urlComponents[1],
    //   }
    // }
  },
  methods: {
    ...mapActions('offers', ['getOffer', 'updateOffer', 'deleteOffer']),
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
    async onSwitch() {
      this.updateOffer({
        id: this.id,
        payload: {
          enabled: this.switcher,
        },
      }).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Status successfully changed to ${this.switcher ? 'enabled' : 'disabled'}`,
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
        // TODO:
        // code,
        // start_date,
        // end_date,
        // track_url
      }

      const [error, response] = await this.updateOffer({
        id: this.id,
        payload,
      })

      if (error) {
        console.error(error)
        return
      }

      this.isEdit = false
      this.offer = response
      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Offer details updated sussessfully.',
      })
    },
    async submitDeleteOffer(notes) {
      this.modals.remove = false
      // TODO: send notes
      const [error] = await this.deleteOffer(this.id)

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
  },
}
</script>

<template>
  <main-layout
    :title="offer.name"
    back
  >
    <edit-layout
      v-if="isEdit"
      :source="offer"
      :fields="fields"
      :presets="feedOffers"
      :is-remove="isRemove"
      @cancel="isEdit = false"
      @update="modals.update = true"
      @remove="modals.remove = true"
    >
      <template slot="removeButton">
        <span>Remove Offer</span>
      </template>
      <template slot="updateButton">
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
          @click="isEdit = true"
        />
      </div>

      <div @click="onSwitch">
        <el-switch
          v-model="switcher"
          active-text="Active"
        />
      </div>

      <div>
        <dl
          :class="[
            'datalist',
            $style.list
          ]"
        >
          <dt>Offer Associated Aggreg</dt>
          <dd>{{ aggregator || '-' }}</dd>

          <dt>Offer ID</dt>
          <dd>{{ offer.id || '-' }}</dd>

          <dt>Offer Ext ID</dt>
          <dd>{{ feedOffer.external_id || '-' }}</dd>

          <dt>Offer Created at</dt>
          <dd>{{ formatDate(offer.created_at, 'DD/MM/YYYY hh:mm A') || '-' }}</dd>

          <dt>Offer Updated</dt>
          <dd>{{ formatDate(offer.updated_at, 'DD/MM/YYYY hh:mm A') || '-' }}</dd>

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

          <dt>Offer Tracking URL</dt>
          <dd>{{ '-' }}</dd>
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

  h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}
</style>
