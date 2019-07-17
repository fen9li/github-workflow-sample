<script>
import CellMixin from '@lib/components/data-table/cells/cell.mixin'
import { mapActions } from 'vuex'
import ApiProcessor from '@lib/processors/api-processor'

export default {
  mixins: [CellMixin],
  props: {
    row: {
      type: Object,
      required: true,
    },
    processor: {
      type: ApiProcessor,
      required: true,
    },
  },
  data() {
    return {
      showDialog: false,
      progress: false
    }
  },
  computed: {
    activated() {
      return this.row.offer_id !== null
    },
  },
  methods: {
    ...mapActions('offers', [
      'createGlobalOffer',
    ]),
    ...mapActions('feedOffers', [
      'activateFeedOffer',
    ]),
    onSubmit(event) {
      this.progress = true
      this.createGlobalOffer({
        feed_offer: this.row.external_id,
        name: this.row.name,
      })
        .then(() => this.activateFeedOffer({
          feedOfferId: this.row.id,
          payload: {
            acknowledgement: 'acknowledged',
          },
        }))
        .then(() => {
          this.progress = false
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Successfuly activated',
          })
        })
        .then(() => this.processor.getData())
    },
  },
}
</script>

<template>
  <div>
    <el-button
      v-if="!activated"
      type="text"
      :class="$style.link"
      :loading="progress"
      @click.stop.prevent="onSubmit"
    >
      {{ `${progress ? '' : 'Associate'}` }}
    </el-button>
  </div>
</template>

<style lang="scss" module>
.link {
  display: inline-block;
  width: 100%;
  padding: 0;
  background: none !important;

  :global {
    [class^="el-icon-"] {
      margin: 0 auto;
    }
  }
}
</style>
