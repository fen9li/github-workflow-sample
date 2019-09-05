<script>
import get from 'lodash/get'
import RetailerOffersForm from './retailer-offers-form'
import retailerData from '@tests/__fixtures__/retailer'

export default {
  name: 'RetailerOffers',
  page: {
    title: 'Retailer Offers',
  },
  components: {
    RetailerOffersForm
  },
  data() {
    return {
      retailer: retailerData,
      activeTile: null,
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    map() {
      return get(this.retailer, 'map', {})
    },
    back() {
      return {
        name: 'retailer-details',
        params: {
          id: this.id,
        },
      }
    },
    isHasOffers() {
      return get(this.map, 'offers.length')
    },
    isNewOffer() {
      return this.activeTile === 'new'
    },
  },
  created() {
    if (!this.isHasOffers) this.activeTile = 'new'
  },
  methods: {
    isActiveOffer(id) {
      return this.activeTile === id
    },
    addNewOffer() {
      this.activeTile = 'new'
    },
    previewOffers() {
      this.$router.push({
        name: 'retailer-offers-preview',
      })
    },
    closeTile() {
      this.activeTile = null
    }
  },
}
</script>

<template>
  <main-layout
    :title="`${map.retailer_name} Offers`"
    :back="back"
  >
    <template
      v-if="isHasOffers"
      #header
    >
      <el-button
        size="small"
        plain
        @click="previewOffers"
      >
        Preview Offers
      </el-button>
      <el-button
        type="primary"
        size="small"
        plain
        icon="el-icon-plus"
        @click="addNewOffer"
      >
        Add New Offer
      </el-button>
    </template>

    <div :class="$style.retailerOffers">
      <el-collapse
        v-model="activeTile"
        accordion
      >
        <el-collapse-item
          v-if="isNewOffer"
          name="new"
        >
          <template #title>
            New Offer
            <el-button
              type="text"
              :class="$style.action"
            >
              <i :class="[isNewOffer ? 'el-icon-arrow-up' : 'el-icon-arrow-down']" />
            </el-button>
          </template>
          <retailer-offers-form
            :retailer="map"
            @cancel="closeTile"
          />
        </el-collapse-item>

        <template v-if="isHasOffers">
          <el-collapse-item
            v-for="offer in map.offers"
            :key="offer.id"
            :name="offer.id"
          >
            <template #title>
              {{ offer.offer_name }}
              <el-button
                type="text"
                :class="$style.action"
              >
                <template v-if="!isActiveOffer(offer.id)">
                  Edit
                </template>
                <i :class="[isActiveOffer(offer.id) ? 'el-icon-arrow-up' : 'el-icon-arrow-down']" />
              </el-button>
            </template>
            <retailer-offers-form
              :offer="offer"
              :retailer="map"
              @cancel="closeTile"
            />
          </el-collapse-item>
        </template>
      </el-collapse>
    </div>
  </main-layout>
</template>

<style lang="scss" module>
  .retailerOffers {
    :global {
      .el-collapse, .el-collapse-item__wrap {
        border: none;
      }

      .el-collapse-item {
        overflow: hidden;
        background-color: #FFF;
        border: 1px solid #EBEEF5;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

        .is-active {
          background: #F7F7F7;
          transition: background-color 0.2s;
        }
      }

      .el-collapse-item + .el-collapse-item {
        margin-top: rem(20px);
      }

      .el-collapse-item__arrow {
        display: none;
      }

      .el-collapse-item__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 2.5rem 3rem;
        font-size: 1.4rem;
        font-weight: 600;
        color: #303133;
        border: none;
      }

      .el-collapse-item__content {
        padding: 2rem 3rem;
        font-size: inherit;
        border-top: 1px solid #EBEEF5;
      }
    }
  }

  .action {
    float: right;
    margin-right: .5rem;
    font-weight: 600;
    color: #0086ff;
    background-color: transparent;
    border: none;

    i {
      margin-left: .5rem;
      font-weight: 600;
    }
  }
</style>
