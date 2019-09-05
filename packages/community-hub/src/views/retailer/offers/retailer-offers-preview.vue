<script>
import get from 'lodash/get'
import retailerData from '@tests/__fixtures__/retailer'
import OffersPreview from './components/offers-preview'

export default {
  name: 'RetailerOffersPreview',
  page: {
    title: 'Retailer Offers Preview',
  },
  components: {
    OffersPreview
  },
  data() {
    return {
      retailer: retailerData,
    }
  },
  computed: {
    map() {
      return get(this.retailer, 'map', {})
    },
  },
  methods: {
    closePreview() {
      this.$router.push({
        name: 'retailer-offers',
      })
    },
  },
}
</script>

<template>
  <main-layout :header="false">
    <div :class="$style.offersPreview">
      <div :class="$style.header">
        <div :class="[$style.container, $style.headerContent]">
          <b>Preview mode</b>
          <el-button
            type="text"
            @click="closePreview"
          >
            <div :class="$style.button">
              Close preview
              <i class="el-icon-close" />
            </div>
          </el-button>
        </div>
      </div>

      <div :class="[$style.container, $style.content]">
        <offers-preview :retailer="map" />
      </div>
    </div>
  </main-layout>
</template>

<style lang="scss" module>
  .offersPreview {
    margin: -2rem;
  }

  .container {
    max-width: rem(800px);
    margin: 0 auto;
  }

  .header {
    width: 100%;
    padding: rem(20px);
    background: #202D3C;
  }

  .headerContent {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: rem(18px);
    color: var(--color-primary-text);
    text-align: center;
  }

  .content {
    padding-top: rem(40px);
    padding-bottom: rem(40px);
  }

  .button {
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    align-items: center;
    color: var(--color-primary-text);
    transform: translateY(-50%);

    :global {
      .el-icon-close {
        margin-left: rem(8px);
        font-size: rem(20px);
      }
    }
  }
</style>
