<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import { formatDate } from '@lib/utils/format-date'
import RemoveModal from './remove-offer-modal'
import UpdateModal from './update-offer-modal'
import isPast from '@lib/utils/date-is-past'

export default {
  name: 'Offer',
  components: {
    RemoveModal,
    UpdateModal,
  },
  data() {
    return {
      isEdit: false,
      switcher: false,
      offer: {},
      form: {},
      modals: {
        remove: false,
        update: false,
      },
      mapValues: {
        name: 'name',
        code: 'feed_offer.payload.DefaultPromoCode',
        start_date: 'feed_offer.payload.StartDate',
        end_date: 'feed_offer.payload.EndDate',
        description: 'description',
        terms: 'terms',
      },
      feedOffers: [],
      rules: {
        name: [
          { required: true, message: 'offer name is required' },
        ],
        code: [
          { required: true, message: 'coupon code is required' },
        ],
        start_date: [
          { required: true, message: 'start date is required' },
        ],
        end_date: [
          { required: true, message: 'end date is required' },
        ],
        terms: [
          { required: true, message: 'terms is required' },
        ],
        baseline_url: [
          { required: true, message: 'tracking url is required' },
        ],
      },
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    feedOffer() {
      return get(this.offer, 'feed_offer', {})
    },
    payload() {
      return get(this.offer, 'feed_offer.payload', {})
    },
    feedOfferId() {
      return get(this.feedOffer, 'id')
    },
    aggreg() {
      const aggregId = get(this.offer, 'feed_offer.feed')
      switch (aggregId) {
        case 'apd': return 'APD'
        case 'rakuten': return 'Rakuten'
        case 'cf': return 'Commission Factory'
        default:
          return null
      }
    },
    isRemoveButton() {
      return !isPast(this.form.end_date)
    },
  },
  watch: {
    offer() {
      this.offerToForm()
    },
  },
  async mounted() {
    this.offer = await this.getOffer(this.id)
  },
  methods: {
    ...mapActions('offers', [
      'getOffer',
      'updateOffer',
      'deleteOffer',
    ]),
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
    offerToForm() {
      const newForm = {}

      for (const key of Object.keys(this.mapValues)) {
        newForm[key] = get(this.offer, this.mapValues[key], '')
      }

      newForm.baseline_url = get(this.offer, 'url', '')

      this.form = newForm
      this.switcher = this.offer.enabled

      this.feedOffers = [{
        title: `Updated - ${ this.aggreg }`,
        selected: false,
        name: {
          selected: false,
          value: get(this.offer, 'feed_offer.payload.Name', 'name'),
        },
        code: {
          selected: false,
          value: get(this.offer, 'feed_offer.payload.DefaultPromoCode', 'CODE'),
        },
        start_date: {
          selected: false,
          value: get(this.offer, 'feed_offer.payload.StartDate'),
        },
        end_date: {
          selected: false,
          value: get(this.offer, 'feed_offer.payload.EndDate'),
        },
        description: {
          selected: false,
          value: get(this.offer, 'feed_offer.payload.Description', ''),
        },
        terms: {
          selected: false,
          value: get(this.offer, 'feed_offer.payload.Terms', '-'),
        },
      }]
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
          message: `Status sussessfully changed to ${this.switcher ? 'enabled' : 'disabled'}`,
        })
      })
    },
    changeValue(checked, type, index) {
      if (checked) {
        this.feedOffers.forEach((feed, i) => {
          if (index === i) {
            this.form[type] = feed[type].value
          } else {
            feed[type].selected = false
            feed.selected = false
          }
        })
      } else {
        this.form[type] = get(this.offer, this.mapValues[type], '')
        this.feedOffers.forEach((feed, i) => {
          feed[type].selected = false
          feed.selected = false
        })
      }

      this.checkSelectAll(index)
    },
    checkSelectAll(index) {
      let isAllSelected = true

      for (const key of Object.keys(this.mapValues)) {
        if (!this.feedOffers[index][key].selected) {
          isAllSelected = false
          break
        }
      }

      this.feedOffers[index].selected = isAllSelected
    },
    selectAll(checked, index) {
      this.feedOffers.forEach((feed, i) => {
        const isCurrent = index === i

        for (const key of Object.keys(this.mapValues)) {
          feed[key].selected = isCurrent && checked
          feed.selected = isCurrent && checked
          if (isCurrent) {
            this.form[key] = feed[key].value
          }
        }
      })
    },
    isDisabled(type) {
      let disabled = false

      for (const feed of this.feedOffers) {
        if (feed[type].selected) {
          disabled = true
          break
        }
      }

      return disabled
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        this.modals.update = true
      })
    },
    async submitUpdateOffer(notes) {
      this.modals.update = false
      const [error, response] = await this.updateOffer({
        id: this.id,
        payload: {
          enabled: this.switcher,
          name: this.form.name,
          terms: this.form.terms,
          description: this.form.description,
        },
        // TODO:
        // code: 'feed_offer.payload.DefaultPromoCode',
        // start_date: 'feed_offer.payload.StartDate',
        // end_date: 'feed_offer.payload.EndDate',
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
        message: 'Merchant details updated sussessfully.',
      })
    },
    async submitDeleteOffer(notes) {
      this.modals.remove = false
      // TODO: send notes
      const [error] = await this.deleteOffer(this.offer.id)

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
    <el-card v-if="isEdit">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :class="$style.edit"
        label-position="top"
      >
        <div :class="$style.grid">
          <div :class="$style.divider" />

          <div :class="$style.columnHeader">
            <div :class="$style.columnTitle">
              Current Details
            </div>
          </div>
          <el-form-item
            label="Offer name"
            prop="name"
            :class="$style.columnName"
          >
            <el-input
              v-model="form.name"
              :disabled="isDisabled('name')"
              placeholder="Name"
            />
          </el-form-item>

          <el-form-item
            label="Coupon Code"
            prop="code"
            :class="$style.columnCode"
          >
            <el-input
              v-model="form.code"
              :disabled="isDisabled('code')"
              placeholder="Coupon code"
            />
          </el-form-item>

          <el-form-item
            label="Start Date"
            prop="start_date"
            :class="$style.columnStart"
          >
            <el-date-picker
              v-model="form.start_date"
              type="date"
              format="dd/MM/yyyy"
              :disabled="isDisabled('start_date')"
            />
          </el-form-item>

          <el-form-item
            label="End Date"
            prop="end_date"
            :class="$style.columnEnd"
          >
            <el-date-picker
              v-model="form.end_date"
              type="date"
              format="dd/MM/yyyy"
              :disabled="isDisabled('end_date')"
            />
          </el-form-item>

          <el-form-item
            label="Descriptions"
            prop="description"
            :class="$style.columnDescription"
          >
            <el-input
              v-model="form.description"
              type="textarea"
              :disabled="isDisabled('description')"
            />
          </el-form-item>

          <el-form-item
            label="Terms & Conditions"
            prop="terms"
            :class="$style.columnTerms"
          >
            <el-input
              v-model="form.terms"
              type="textarea"
              :disabled="isDisabled('terms')"
            />
          </el-form-item>

          <el-form-item
            label="Tracking URL"
            prop="baseline_url"
            :class="$style.columnUrl"
          >
            <el-input
              v-model="form.baseline_url"
            >
              <template slot="prepend">
                http://
              </template>
            </el-input>
          </el-form-item>

          <!-- Feeds part -->

          <template v-for="(feed, index) in feedOffers">
            <div
              :key="`all.${ index }`"
              :class="[$style.columnHeader, $style.columnFeedHeader]"
            >
              <div :class="$style.columnTitle">
                {{ feed.title }}
              </div>
              <el-checkbox
                v-model="feed.selected"
                label="Select All"
                @input="selectAll($event, index)"
              />
            </div>
            <div
              :key="`name.${ index }`"
              :class="[$style.columnName, $style.columnFeed]"
            >
              <el-checkbox
                v-model="feed.name.selected"
                label="Offer Name"
                @input="changeValue($event, 'name', index)"
              />
              <span>{{ feed.name.value }}</span>
            </div>
            <div
              :key="`code.${ index }`"
              :class="[$style.columnCode, $style.columnFeed]"
            >
              <el-checkbox
                v-model="feed.code.selected"
                label="Coupon Code"
                @input="changeValue($event, 'code', index)"
              />
              <span>{{ feed.code.value }}</span>
            </div>
            <div
              :key="`start.${ index }`"
              :class="[$style.columnStart, $style.columnFeed]"
            >
              <el-checkbox
                v-model="feed.start_date.selected"
                label="Start Date"
                @input="changeValue($event, 'start_date', index)"
              />
              <span>{{ formatDate(feed.start_date.value) }}</span>
            </div>
            <div
              :key="`end.${ index }`"
              :class="[$style.columnEnd, $style.columnFeed]"
            >
              <el-checkbox
                v-model="feed.end_date.selected"
                label="End Date"
                @input="changeValue($event, 'end_date', index)"
              />
              <span>{{ formatDate(feed.end_date.value) }}</span>
            </div>
            <div
              :key="`description.${ index }`"
              :class="[$style.columnDescription, $style.columnFeed]"
            >
              <el-checkbox
                v-model="feed.description.selected"
                label="Description"
                @input="changeValue($event, 'description', index)"
              />
              <span>{{ feed.description.value }}</span>
            </div>
            <div
              :key="`terms.${ index }`"
              :class="[$style.columnTerms, $style.columnFeed]"
            >
              <el-checkbox
                v-model="feed.terms.selected"
                label="Terms & Conditions"
                @input="changeValue($event, 'terms', index)"
              />
              <span>{{ feed.terms.value }}</span>
            </div>
          </template>
        </div>
        <div :class="$style.footer">
          <div :class="$style.footerItem">
            <el-button
              v-if="isRemoveButton"
              type="danger"
              @click="modals.remove = true"
            >
              Remove Offer
            </el-button>
          </div>
          <div :class="$style.footerItem">
            <el-button @click="isEdit = false">
              Cancel
            </el-button>
            <el-button
              type="primary"
              @click="submitForm"
            >
              Update Offer
            </el-button>
          </div>
        </div>
      </el-form>
    </el-card>

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
          <dd>{{ aggreg || '-' }}</dd>

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
          <dd>{{ payload.DefaultPromoCode || '-' }}</dd>

          <dt>Offer Starts</dt>
          <dd>{{ formatDate(payload.StartDate) || '-' }}</dd>

          <dt>Offer Ends</dt>
          <dd>{{ formatDate(payload.EndDate) || '-' }}</dd>

          <dt>Description</dt>
          <dd>{{ offer.description || '-' }}</dd>

          <dt>Terms & Conditions</dt>
          <dd>{{ offer.terms || '-' }}</dd>

          <dt>Offer Tracking Url</dt>
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
      :start-date="form.start_date"
      :end-date="form.end_date"
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

.edit {
  overflow-x: auto;
  overflow-y: hidden;
}

.grid {
  display: grid;
  grid-template-rows: auto rem(66px) auto; // 32 top margin + 32 bottom margin + 2 height
  grid-auto-flow: column dense;
}

.divider {
  grid-row-start: 2;
  grid-column: 1/999;
  margin: rem(32px 0);
  border-bottom: 2px dashed var(--color-primary);
}

.columnHeader {
  grid-row-start: 1;
  min-width: 300px;
}

.columnName {
  grid-row-start: 3;
}

.columnCode {
  grid-row-start: 4;
}

.columnStart {
  grid-row-start: 5;
}

.columnEnd {
  grid-row-start: 6;
}

.columnDescription {
  grid-row-start: 7;
}

.columnTerms {
  grid-row-start: 8;
}

.columnUrl {
  grid-row-start: 9;
}

.columnFeedHeader {
  padding-left: rem(48px);
}

.columnFeed {
  display: flex;
  flex-direction: column;
  padding-top: rem(24px);
  padding-left: rem(48px);

  :global(.el-checkbox) {
    margin-bottom: rem(8px);
  }

  > span {
    margin-left: rem(38px);
    font-size: rem(14px);
    color: var(--color-dark-gray);
  }
}

.columnTitle {
  margin-bottom: 1.4rem;
  overflow: hidden;
  font-size: 1.4rem;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding-top: rem(16px);
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
