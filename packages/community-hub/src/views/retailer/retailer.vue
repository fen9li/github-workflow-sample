<script>
import get from 'lodash/get'
import retailerData from '@tests/__fixtures__/retailer'
import RetailerDetails from './details/retailer-details'
import RetailerEdit from './edit/retailer-edit'

export default {
  name: 'Retailer',
  page: {
    title: 'Retailer',
  },
  components: {
    RetailerDetails,
    RetailerEdit,
  },
  data() {
    return {
      isEdit: this.$route.params.edit,
      loading: false,
      retailer: retailerData,
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
      if (this.isEdit) {
        return {
          name: 'retailer-details',
          params: {
            id: this.id,
            edit: null,
          },
        }
      } else {
        return {
          name: 'retailers',
        }
      }
    },
  },
  watch: {
    $route(route) {
      if (!route.params.edit) {
        this.isEdit = false
      }
    },
  },
  methods: {
    async onEdit() {
      this.isEdit = true
      await this.$nextTick()
      if (this.isEdit) {
        this.$router.push({
          name: 'retailer-details',
          params: { edit: 'edit' },
        })
      }
    },
    onCancel() {
      this.isEdit = false
    },
    onManage() {
      this.$router.push({
        name: 'offers',
        params: {
          filters: [{
            attribute: 'retailer_name',
            comparison: 'eq',
            value: this.map.retailer_name,
          }],
        },
      })
    },
  },
}
</script>

<template>
  <main-layout
    :title="map.retailer_name"
    :loading="loading"
    :back="back"
  >
    <retailer-edit
      v-if="isEdit"
      :retailer="map"
      @cancel="onCancel"
    />
    <el-card v-else>
      <div
        slot="header"
        :class="$style.header"
      >
        <span>
          Retailer Details
        </span>
        <div :class="$style.headerButtons">
          <el-button
            type="primary"
            plain
            :class="$style.headerButton"
            @click="onEdit"
          >
            Edit Details
          </el-button>
          <el-button
            type="primary"
            :class="$style.headerButton"
            @click="onManage"
          >
            Manage offers
          </el-button>
        </div>
      </div>
      <retailer-details
        :retailer="map"
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

.headerButtons {
  display: flex;
  flex-direction: column;
  margin: rem(-8px);
  margin-bottom: rem(-64px)
}

.headerButton {
  margin: rem(8px) !important;
}
</style>
