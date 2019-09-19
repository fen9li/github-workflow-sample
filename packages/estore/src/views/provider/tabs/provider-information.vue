<script>
import { formatDate } from '@lib/utils/format-date'
import DataBox from '@lib/components/data-box'
import DataList from '@lib/components/data-list'

export default {
  name: 'ProviderInformationTab',
  components: {
    DataBox,
    DataList,
  },
  props: {
    provider: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    status() {
      return this.provider.active ? 'active' : 'inactive'
    },
  },
  methods: {
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY hh:mm A')
    },
  },
}
</script>

<template>
  <div>
    <data-box
      v-if="!loading"
      header="Provider Details"
      :status="status"
    >
      <data-list>
        <dt>Date Created</dt>
        <dd>{{ formatDate(provider.created_at) }}</dd>

        <dt>Provider ID</dt>
        <dd>{{ provider.id }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ provider.name }}</dd>

        <dt>Default Provider Image</dt>
        <dd
          v-if="provider.img"
          :class="$style.logo"
          :style="`background-image: url('${provider.img}')`"
        />
        <dd v-else>
          —
        </dd>

        <dt>Sales Tax Rate</dt>
        <dd>{{ provider.taxRate }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(provider.updated_at) }}</dd>
      </data-list>
    </data-box>
  </div>
</template>

<style lang="scss" module>
.logo {
  height: 3rem;
  padding: 0;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  background-repeat: no-repeat;
  background-position: center left;
  background-size: contain;
}

</style>
