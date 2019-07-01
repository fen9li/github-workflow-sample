<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import { formatDate } from '@lib/utils/format-date'
import RemoveModal from './remove-offer-modal'

export default {
  name: 'Offer',
  components: {
    RemoveModal,
  },
  data() {
    return {
      isEdit: false,
      switcher: false,
      offer: {},
      form: {},
      modals: {
        remove: false,
      },
      mapValues: {
        name: 'name',
        code: 'feed_offer.payload.DefaultPromoCode',
        start_date: 'feed_offer.payload.StartDate',
        end_date: 'feed_offer.payload.EndDate',
        description: 'description',
        terms: 'terms',
      },
      feedOffers: [
        {
          title: 'Updated-commission-factory',
          selected: false,
          name: {
            selected: false,
            value: '10% off first purchase',
          },
          code: {
            selected: false,
            value: 'HB2819',
          },
          start_date: {
            selected: false,
            value: '2019-06-30T00:00:00+10:00',
          },
          end_date: {
            selected: false,
            value: '2019-08-10T00:00:00+10:00',
          },
          description: {
            selected: false,
            value: 'test description',
          },
          terms: {
            selected: false,
            value: 'test terms',
          },
        }, {
          title: 'Updated-commission-factory 2',
          selected: false,
          name: {
            selected: false,
            value: '15% off first purchase',
          },
          code: {
            selected: false,
            value: 'WD1545',
          },
          start_date: {
            selected: false,
            value: '2019-09-10T00:00:00+10:00',
          },
          end_date: {
            selected: false,
            value: '2019-11-10T00:00:00+10:00',
          },
          description: {
            selected: false,
            value: 'test description test description test description test description test description',
          },
          terms: {
            selected: false,
            value: 'test terms test terms test terms test terms test terms',
          },
        },
      ],
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
  },
  watch: {
    offer(val) {
      this.offerToForm()
    },
  },
  async mounted() {
    this.offer = await this.getOffer(this.id)
    this.switcher = this.offer.enabled
  },
  methods: {
    ...mapActions('offers', [
      'getOffer',
      'updateOffer',
      'deleteOffer',
    ]),
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
    offerToForm() {
      const newForm = {}

      for (const key of Object.keys(this.mapValues)) {
        newForm[key] = get(this.offer, this.mapValues[key], '')
      }

      newForm.baseline_url = get(this.offer, 'url', '')

      this.form = newForm
    },
    async onSwitch() {
      const [, response] = await this.updateOffer({
        id: this.id,
        payload: {
          enabled: this.switcher,
        },
      })
      if (response) {
        this.offer = response
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Merchant status sussessfully changed to ${this.switcher ? 'enabled' : 'disabled'}`,
        })
      }
    },
    async updateOffer() {
      // const [, response] = await this.updateOffer({
      //   id: this.id,
      //   payload: {
      //     enabled: this.switcher,
      //   },
      // })
      // console.log(response)
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
    removeOffer(notes) {
      this.modals.remove = false
      // TODO: send notes
      this.deleteOffer(this.offer.id)
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
            required
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
            required
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
            required
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
            required
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
            prop="description"
            required
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
              @click="updateOffer"
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
          <dd>{{ offer.feeds || '-' }}</dd>

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

        <pre>{{ offer }}</pre>
      </div>
    </el-card>
    <remove-modal
      v-if="modals.remove"
      :visible.sync="modals.remove"
      @submit="removeOffer"
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
  }
}

.columnTitle {
  margin-bottom: 1.4rem;
  font-size: 1.4rem;
  font-weight: bold;
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
