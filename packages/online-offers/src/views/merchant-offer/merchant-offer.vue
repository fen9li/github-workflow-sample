<script>
// import
export default {
  name: 'MerchantOffer',
  data() {
    return {
    }
  },
  methods: {

  },
}
</script>

<template>
  <main-layout
    title="Offers"
    back
  >
    <el-card>
      <div :class="$style.wrapper">
        <div>
          10 % Off
        </div>

        <div :class="$style.controls">
          <el-button
            type="success"
            class="wide-button"
          >
            Activate Offer
          </el-button>

          <div>
            <el-button
              type="primary"
              class="wide-button"
            >
              Edit Offer Details
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;
  justify-content: space-between
}

</style>
