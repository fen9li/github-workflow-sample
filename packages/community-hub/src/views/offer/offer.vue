<script>
import get from 'lodash/get'
import offerData from '@tests/__fixtures__/offer'
import { formatDate } from '@lib/utils/format-date'

export default {
  name: 'Offer',
  page: {
    title: 'Offer',
  },
  data() {
    return {
      isEdit: this.$route.params.edit,
      loading: false,
      offer: offerData,
      modals: {
        update: false,
      },

    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    map() {
      return get(this.offer, 'map', {})
    },
    categories() {
      return get(this.map, 'categories', []).map(item => item)
    },
    endDate() {
      return get(this.map, 'end_at')
    },
    startDate() {
      return get(this.map, 'created_at')
    },
    back() {
      if (this.isEdit) {
        return {
          name: 'offer-details',
          params: {
            id: this.id,
            edit: null,
          },
        }
      } else {
        return {
          name: 'offers',
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
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY', false)
    },
    async onEdit(value) {
      this.isEdit = value
      await this.$nextTick()
      if (this.isEdit) {
        this.$router.push({
          name: 'offer-details',
          params: { edit: 'edit' },
        })
      }
    },
  },
}
</script>

<template>
  <main-layout
    :title="map.offer_name"
    :back="back"
    :loading="loading"
  >
    <el-card>
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
          @click="onEdit(true)"
        />
      </div>

      <div>
        <dl :class="['datalist', $style.list]">
          <dt>Status</dt>
          <dd>{{ map.offer_name || '—' }}</dd>

          <dt>Retailer Name</dt>
          <dd>{{ map.retailer_name || '—' }}</dd>

          <dt>Last Updated</dt>
          <dd>{{ `${formatDate(map.updated_at, 'DD/MM/YYYY hh:mm A')} by ${map.updated_with}` || '—' }}</dd>

          <dt>Offer Name</dt>
          <dd>{{ map.offer_name || '—' }}</dd>

          <dt>Category</dt>
          <dd>
            {{ categories.join(', ') || '—' }}
          </dd>

          <dt>Description</dt>
          <dd>
            {{ map.description || '—' }}
          </dd>

          <dt>Locations</dt>
          <dd>
            <ul>
              <li
                v-for="(location, index) in map.locations"
                :key="index"
              >
                {{ location }}
              </li>
            </ul>
          </dd>

          <dt>Retailer Website</dt>
          <dd>
            {{ map.website || '—' }}
          </dd>

          <dt>Offer Created</dt>
          <dd>
            {{ formatDate(map.created_at, 'DD/MM/YYYY hh:mm A') || '—' }}
          </dd>

          <dt>End Date</dt>
          <dd>
            {{ formatDate(map.end_at, 'DD/MM/YYYY hh:mm A') || '—' }}
          </dd>

          <dt>Offer Type</dt>
          <dd>
            {{ map.offer_type || '—' }}
          </dd>

          <dt>Coupon Code</dt>
          <dd>
            {{ map.coupon_code || '—' }}
          </dd>

          <dt>Offer URL</dt>
          <dd>
            {{ map.offer_url || '—' }}
          </dd>
        </dl>
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

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul li + li {
    padding-top: 1rem;
  }

}
</style>

