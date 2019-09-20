<script>
import { mapActions } from 'vuex'
import get from 'lodash/get'
import formatDollar from '@lib/utils/format-dollar'
import capitalize from 'lodash/capitalize'
import FeedMerchantDialog from '../feed-merchant-dialog-container.vue'
import formatCommission from '@lib/utils/format-commission'

export default {
  name: 'FeedDetails',
  components: {
    FeedMerchantDialog
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      details: {},
      loading: true,
      form: {
        baseline_rate: '',
        baseline_url: '',
      },
      submitting: false,
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    rakuten() {
      return this.details && this.details.feed === 'rakuten'
    },
    ready() {
      return Object.keys(this.details).length
    },
    name() {
      return this.ready ? this.details.map.name : ''
    },
    canAttach() {
      return this.details.status === 'active'
    },
    commission() {
      const commission = get(this.details, 'map.commission', {})
      return formatCommission(commission)
    },
  },
  async created() {
    await this.getDetails()
    this.prefillForm()
  },
  methods: {
    ...mapActions('feedMerchants', [
      'getFeedMerchant',
      'updateFeedMerchant',
    ]),
    capitalize,
    formatCommission,
    async getDetails() {
      try {
        const [, response] = await this.getFeedMerchant({ merchantId: this.id })
        this.details = response
      } catch (error) {
        this.$router.push('/merchants')
        console.error('Error while requesting data', error)
      } finally {
        this.loading = false
      }
    },
    prefillForm() {
      const { form } = this
      const { map: { website: trackingUrl, commission } } = this.details

      form.baseline_rate = commission.base
      form.baseline_url = trackingUrl
    },
    formatDollar(value) {
      return formatDollar(value)
    },
    async onSubmit() {
      this.submitting = true
      const response = await this.updateFeedMerchant({
        payload: this.form,
        id: this.details.id,
      })
      this.submitting = false

      this.$notifier({
        response,
        errorTitle: `Unable to update feed`,
        successMsg: `Feed successfully updated`
      }).then(success => {
        if(success) {
          this.getDetails()
        }
      })
    },
  },
}
</script>

<template>
  <main-layout
    :title="`${name} Feed Updates`"
    :back="{ name: 'feed-update', params: { slug: slug } }"
    :loading="loading"
  >
    <el-card
      v-if="!loading && ready"
      :class="$style.card"
    >
      <div :class="$style.wrap">
        <div :class="[$style.wrapTitle, $style.flexWrap]">
          General Information
          <!--          <el-button type="success">-->
          <!--            Create/Associate {{ canAttach }}-->
          <!--          </el-button>-->
          <feed-merchant-dialog
            :row="details"
            :processor="{ getData: getDetails }"
            show-button
            value=""
            formatted-value=""
            attribute=""
          />
        </div>
        <dl :class="['datalist', $style.list]">
          <dt>Merchant ID</dt>
          <dd>{{ details.id }}</dd>
          <dt>Merchant Ext ID</dt>
          <dd>{{ details.external_id }}</dd>

          <dt>Merchant Name</dt>
          <dd>{{ details.name }}</dd>

          <dt>Merchant Logo</dt>
          <dd>
            <img
              v-if="details.map.logo"
              :class="$style.img"
              :src="details.map.logo"
              :alt="details.map.name"
            >
            <span v-else>—</span>
          </dd>

          <dt>Commission Aggregator</dt>
          <dd>{{ details.feed }}</dd>

          <template v-if="!rakuten">
            <dt>Commission Type</dt>
            <dd>{{ commission.type || '–' }}</dd>
            <dt>Commission Rate</dt>
            <dd>
              <span :class="$style.rate">
                {{ commission.base || '–' }}
              </span>
              <span :class="$style.rate">
                {{ commission.min || '–' }}
              </span>
              <span :class="$style.rate">
                {{ commission.max || '–' }}
              </span>
            </dd>
          </template>

          <dt>Summary</dt>
          <dd>{{ details.map.summary || '—' }}</dd>

          <dt>Merchant Website</dt>
          <dd>{{ details.map.website || '—' }}</dd>

          <dt>Terms and Conditions</dt>
          <dd
            :class="$style.terms"
            v-html="details.map.terms"
          />
        </dl>
        <div
          v-if="rakuten"
          :class="$style.formWrapper"
        >
          <div :class="$style.wrapTitle">
            Comission Tracking Details
          </div>

          <el-form
            :class="$style.form"
            :model="form"
            label-width="100%"
            label-position="top"
          >
            <el-form-item
              label="Baseline Comission Rate"
              :class="$style.input"
            >
              <el-input
                v-model="form.baseline_rate"
                type="number"
              >
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="Baseline Tracking URL"
              :class="$style.input"
            >
              <el-input v-model="form.baseline_url">
                <template slot="prepend">
                  URL
                </template>
              </el-input>
            </el-form-item>
            <div :class="$style.buttonWrapper">
              <el-button
                type="primary"
                :disabled="submitting"
                @click="onSubmit"
              >
                Save changes
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.wrap {
  display: flex;
  flex-direction: column;
}

.flexWrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.wrapTitle {
  font-size: 1.4rem;
  font-weight: 600;
}

.warn {
  max-width: 25rem;
  padding: 1.3rem;
  text-align: right;
  background: #fff1f1;
  border-radius: 0.7rem;
}

.img {
  max-width: 10rem;
}
.warnMeta {
  font-weight: bold;
}

.warnDescription {
  margin-top: 1rem;
  font-size: 0.7rem;
}

.detailsBlock {
  margin-bottom: 2rem;
}

.header {
  padding-top: 1.2rem;
}

.headerData {
  display: flex;
}

.amount {
  width: 15rem;
  font-size: 1.5rem;
}

.headerStatus {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
}

.statusIcon {
  margin-right: 0.5rem;
}

.refund {
  margin-top: 0.3rem;
  font-size: 1rem;
  color: var(--color-error);
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

.formWrapper {
  padding-top: rem(36px);
}

.form {
  padding-top: rem(24px);
}

.input {
  width: 300px;
}

.buttonWrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.rate {
  padding-right: 0.5rem;

  @media screen and (max-width: 1280px) {
    display: block;
  }

  @media screen and (min-width: 1280px) {
    padding-right: 2.5rem;
  }
}
</style>
