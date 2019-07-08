<script>
import { mapActions } from 'vuex'
import merchantDetails from './details/merchant-details'
import merchantEdit from './edit/merchant-edit'

export default {
  name: 'Merchant',
  components: {
    merchantDetails,
    merchantEdit,
  },
  data() {
    return {
      loading: true,
      merchant: {},
      merchantFeeds: [],
      categories: [],
      edit: false,
    }
  },
  computed: {
    merchantId() {
      return this.$route.params.id
    },
    showAck() {
      return this.details.acknowledgement === 'created'
    },
  },
  created() {
    this.fetchMerchant()
  },
  methods: {
    ...mapActions('merchants', [
      'getMerchantFeeds',
      'getGlobalMerchant',
    ]),
    ...mapActions('categories', [
      'getCategories',
    ]),
    async fetchMerchant() {
      const [, merchant] = await this.getGlobalMerchant(this.merchantId)
      const [, { items: merchantFeeds }] = await this.getMerchantFeeds(this.merchantId)
      // get all categories
      this.categories = await this.getCategories()
      this.merchant = merchant
      this.merchant.commission = merchantFeeds[0].map.feed
      this.merchantFeeds = merchantFeeds
      this.loading = false
    },
    onUpdate(response) {
      response.commission = this.merchantFeeds[0].map.feed
      this.merchant = response
    },
  },
}
</script>

<template>
  <main-layout
    :title="merchant.name"
    :back="{ name: 'merchants' }"
  >
    <base-loader
      v-if="loading"
      theme="state"
      size="large"
    />
    <el-card v-else>
      <merchant-edit
        v-if="edit"
        :merchant="merchant"
        :feeds="merchantFeeds"
        :categories="categories"
        @update="onUpdate"
        @cancel="edit = false"
      />
      <template v-else>
        <div
          slot="header"
          :class="$style.header"
        >
          <span>
            General Information
          </span>
          <div :class="$style.controls">
            <div
              v-if="showAck"
              :class="$style.ack"
            >
              <el-icon name="info" />
              New updates to be reviewed
            </div>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edit = true"
            />
          </div>
        </div>
        <merchant-details :details="details" />
      </template>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.controls {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.ack {
  display: flex;
  align-items: center;
  justify-content: center;
  height: rem(40px);
  padding-right: rem(20px);
  padding-left: rem(20px);
  margin-right: rem(20px);
  font-size: 1rem;
  font-weight: normal;
  color: white;
  background-color: var(--color-success);
  border-radius: rem(20px);

  :global(.el-icon-info) {
    margin-right: rem(8px);
  }
}
</style>
