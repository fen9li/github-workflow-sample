<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'

export default {
  name: 'Offer',
  data() {
    return {
      isEdit: false,
      switcher: false,
      offer: {},
      form: {},
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
  async mounted() {
    this.offer = await this.getOffer(this.id)
    this.switcher = this.feedOffer.enabled
  },
  methods: {
    ...mapActions('offers', ['getOffer', 'updateOffer', 'deleteOffer']),
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
              placeholder="Coupon code"
            />
          </el-form-item>

          <el-form-item
            label="Start Date"
            prop="start_date"
            required
            :class="$style.columnStart"
          >
            <el-input
              v-model="form.start_date"
            />
          </el-form-item>

          <el-form-item
            label="End Date"
            prop="end_date"
            required
            :class="$style.columnEnd"
          >
            <el-input
              v-model="form.end_date"
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

          <template>
            <div :class="[$style.columnHeader, $style.columnFeedHeader]">
              <div :class="$style.columnTitle">
                Updated-commission-factory
              </div>
              <el-checkbox label="Select All" />
            </div>
            <div :class="[$style.columnName, $style.columnFeed]">
              <el-checkbox label="Offer Name" />
              <span>10% off first purchase</span>
            </div>
            <div :class="[$style.columnCode, $style.columnFeed]">
              <el-checkbox label="Coupon Code" />
              <span>10% off first purchase</span>
            </div>
            <div :class="[$style.columnStart, $style.columnFeed]">
              <el-checkbox label="Start Date" />
              <span>10% off first purchase</span>
            </div>
            <div :class="[$style.columnEnd, $style.columnFeed]">
              <el-checkbox label="End Date" />
              <span>10% off first purchase</span>
            </div>
            <div :class="[$style.columnDescription, $style.columnFeed]">
              <el-checkbox label="Description" />
              <span>10% off first purchase</span>
            </div>
            <div :class="[$style.columnTerms, $style.columnFeed]">
              <el-checkbox label="Terms & Conditions" />
              <span>10% off first purchase</span>
            </div>
          </template>
        </div>
        <div :class="$style.footer">
          <div :class="$style.footerItem">
            <el-button type="danger">
              Remove Offer
            </el-button>
          </div>
          <div :class="$style.footerItem">
            <el-button @click="isEdit = false">
              Cancel
            </el-button>
            <el-button type="primary">
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
          <dd>{{ offer.created_at || '-' }}</dd>

          <dt>Offer Updated</dt>
          <dd>{{ offer.updated_at || '-' }}</dd>

          <dt>Offer Name</dt>
          <dd>{{ offer.name || '-' }}</dd>

          <dt>Coupon Code</dt>
          <dd>{{ payload.DefaultPromoCode || '-' }}</dd>

          <dt>Offer Starts</dt>
          <dd>{{ '-' }}</dd>

          <dt>Offer Ends</dt>
          <dd>{{ '-' }}</dd>

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
