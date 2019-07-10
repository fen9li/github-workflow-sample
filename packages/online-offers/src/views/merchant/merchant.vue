<script>
import { mapActions, mapState } from 'vuex'
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
      isEdit: this.$route.params.edit,
    }
  },
  computed: {
    ...mapState('categories', ['categories']),
    merchantId() {
      return this.$route.params.id
    },
    feed() {
      return this.merchantFeeds[0] || {}
    },
    showAck() {
      const { merchantFeeds } = this

      return merchantFeeds.some(f => f.acknowledgement === 'updated')
    },
    back() {
      if (this.isEdit) {
        return {
          name: 'merchant-details',
          params: {
            id: this.merchantId,
            edit: null,
          },
        }
      } else {
        return {
          name: 'merchants',
        }
      }
    },
  },
  watch: {
    '$route'(route) {
      if (!route.params.edit) {
        this.isEdit = false
      }
    },
  },
  created() {
    this.fetchMerchant()
  },
  methods: {
    ...mapActions('merchants', ['getMerchantFeeds', 'getGlobalMerchant']),
    async fetchMerchant() {
      const [, merchant] = await this.getGlobalMerchant(this.merchantId)
      const [, { items: merchantFeeds }] = await this.getMerchantFeeds(
        this.merchantId
      )
      this.merchantFeeds = merchantFeeds
      this.merchant = merchant
      this.merchant.commission = merchantFeeds[0].map.feed
      this.loading = false
    },
    async onEdit(value) {
      this.isEdit = value
      await this.$nextTick()
      this.$router.push({
        name: 'merchant-details',
        params: { edit: this.isEdit ? 'edit' : null },
      })
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
    :back="back"
    :loading="loading"
  >
    <merchant-edit
      v-if="isEdit"
      :merchant="merchant"
      :feeds="merchantFeeds"
      :categories="categories"
      @update="onUpdate"
      @cancel="onEdit(false)"
    />
    <el-card v-else>
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
            @click="onEdit(true)"
          />
        </div>
      </div>
      <merchant-details
        :merchant="merchant"
        :feed="feed"
      />
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
