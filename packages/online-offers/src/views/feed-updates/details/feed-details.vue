<script>
import { mapActions } from 'vuex'
import formatDollar from '@lib/utils/format-dollar'
import capitalize from 'lodash/capitalize'

const rules = [
  {
    path: 'payload',
    key: 'name',
    values: [
      'advertisername',
      'name',
      'merchantname',
    ],
  },
  {
    path: 'payload',
    key: 'comission',
    values: [
      'comission',
      'offerdescription',
    ],
  },
]

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
      isEdit: false,
      cost: '',
      url: '',
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
  },
  created() {
    this.getDetails()
  },
  methods: {
    ...mapActions('merchants', [
      'getMerchant',
    ]),
    capitalize,
    dataTransform(item) {
      rules.forEach(({ path, key, values }) => {
        const found = Object.keys(item[path]).filter(name => values.includes(name.toLowerCase()))
        if (found) {
          item[key] = item[path][found[0]]
        }
      })
      return item
    },
    async getDetails() {
      try {
        const [, response] = await this.getMerchant({ merchantId: this.id })
        this.details = this.dataTransform(response)
      } catch (error) {
        console.error('Error while requesting data', error)
      } finally {
        this.loading = false
      }
    },
    formatDollar(value) {
      return formatDollar(value)
    },
  },
}
</script>

<template>
  <main-layout
    :title="`${details.name ? details.name : ''} Feed Updates`"
    back
  >
    <base-loader
      v-if="loading"
      theme="state"
      size="large"
    />
    <el-card
      v-else-if="!loading && details"
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
          <dt>Merchant Ext ID</dt>
          <dd>{{ details.id }}</dd>

          <dt>Merchant Name</dt>
          <dd>{{ details.name }}</dd>

          <dt>Merchant Logo</dt>
          <dd>
            <img
              v-if="details.payload.logo"
              :src="details.payload.logo"
              :alt="details.payload.name"
            >
            <span v-else>—</span>
          </dd>

          <dt>Commission Aggregator</dt>
          <dd>{{ details.feed }}</dd>

          <dt>Summary</dt>
          <dd>{{ details.payload.summary || '—' }}</dd>

          <template
            v-if="!isEdit"
          >
            <dt>Commission Rate</dt>
            <dd>{{ details.payload.comission ? formatDollar(details.payload.comission.base) : '—' }}</dd>
          </template>

          <dt>Merchant Tracking URL</dt>
          <dd>{{ details.payload.TrackingUrl || '—' }}</dd>

          <dt>Merchant Website</dt>
          <dd>{{ details.payload.TargetUrl || '—' }}</dd>

          <dt>Terms and Conditions</dt>
          <dd
            :class="$style.terms"
            v-html="details.payload.TermsAndConditions"
          />
        </dl>
        <template
          v-if="isEdit"
        >
          <div :class="$style.wrapTitle">
            Comission Tracking Details
          </div>
          <el-input
            v-model="details.payload.comission"
          >
            <template slot="prepend">
              $
            </template>
          </el-input>
          <el-input
            v-model="details.payload.TrackingUrl"
          >
            <template slot="prepend">
              http://
            </template>
          </el-input>
        </template>
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

</style>
