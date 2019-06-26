<script>
import { mapActions } from 'vuex'


export default {
  name: 'Offer',
  data() {
    return {
      offer: {},
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
  async mounted() {
    this.offer = await this.getOffer(this.id)
  },
  methods: {
    ...mapActions('offers', ['getOffer']),
  },
}
</script>

<template>
  <main-layout
    :title="offer.name"
    back
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
        />
      </div>

      <!-- TODO Place for cell-toggle -->

      <div>
        <dl
          :class="[
            'datalist',
            $style.list
          ]"
        >
          <dt>Offer Associated Aggreg</dt>
          <dd>{{ offer.feeds || '-' }}</dd>
        </dl>
      </div>
      <!-- <pre>{{ offer }}</pre> -->
      <!-- <merchant-edit
        v-if="edit"
        :details="details"
      />
      <merchant-details
        v-else
        :details="details"
        @editMerchant="edit = true"
      /> -->
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

  h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0 0 1rem;
    font-size: 1rem;
  }
}
</style>
