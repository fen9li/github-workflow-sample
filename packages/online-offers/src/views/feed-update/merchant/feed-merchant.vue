<script>
import { mapActions } from 'vuex'
import formatDollar from '@lib/utils/format-dollar'
import capitalize from 'lodash/capitalize'

export default {
  name: 'FeedDetails',
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
      form: {},
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
  },
  created() {
    this.getDetails()
  },
  methods: {
    ...mapActions('merchants', [
      'getMerchant',
    ]),
    ...mapActions('feedMerchants', [
      'updateFeedMerchant',
    ]),
    capitalize,
    async getDetails() {
      try {
        const [, response] = await this.getMerchant({ merchantId: this.id })
        this.details = response
      } catch (error) {
        this.$router.push('/merchants')
        console.error('Error while requesting data', error)
      } finally {
        this.loading = false
      }
    },
    formatDollar(value) {
      return formatDollar(value)
    },
    async onSubmit() {
      this.submitting = true
      const [error, response] = await this.updateFeedMerchant({ payload: this.form, id: this.details.id })
      this.submitting = false
      if (error) {
        console.error('Error while requesting data', error.message)
      }
      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'Successfuly updated',
        })
        this.getDetails()
      }
    },
  },
}
</script>

<template>
  <main-layout
    :title="`${name} Feed Updates`"
    :back="{name: 'feed-update', params: {slug: slug}}"
    :loading="loading"
  >
    <el-card
      v-if="!loading && ready"
      :class="$style.card"
    >
      <div :class="$style.wrap">
        <div :class="$style.wrapTitle">
          General Information
        </div>
        <dl
          :class="[
            'datalist',
            $style.list
          ]"
        >
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

          <dt>Summary</dt>
          <dd>{{ details.map.summary || '—' }}</dd>

          <template
            v-if="!rakuten"
          >
            <dt>Commission Rate</dt>
            <dd>{{ details.map.comission ? formatDollar(details.map.comission.base) : '—' }}</dd>

            <dt>Merchant Tracking URL</dt>
            <dd>{{ details.map.TrackingUrl || '—' }}</dd>
          </template>
          <template v-else>
            <template v-if="details.metadata && details.metadata.baseline_rate">
              <dt>Commission Rate</dt>
              <dd>{{ details.metadata.baseline_rate ? formatDollar(details.metadata.baseline_rate) : '—' }}</dd>
            </template>

            <template v-if="details.metadata && details.metadata.baseline_url">
              <dt>Merchant Tracking URL</dt>
              <dd>{{ details.metadata.baseline_url || '—' }}</dd>
            </template>
          </template>

          <dt>Merchant Website</dt>
          <dd>{{ details.map.TargetUrl || '—' }}</dd>

          <dt>Terms and Conditions</dt>
          <dd
            :class="$style.terms"
            v-html="details.map.TermsAndConditions"
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
                <template slot="prepend">
                  $
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="Baseline Tracking URL"
              :class="$style.input"
            >
              <el-input
                v-model="form.baseline_url"
              >
                <template slot="prepend">
                  http://
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
  font-size: .7rem;
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
  margin-right: .5rem;
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

  h2, h3, h4, h5, h6 {
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

</style>
