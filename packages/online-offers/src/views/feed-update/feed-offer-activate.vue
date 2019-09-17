<script>
import CellMixin from '@lib/components/data-table/cells/cell.mixin'
import { mapActions } from 'vuex'
import ApiProcessor from '@lib/processors/api-processor'
import offerCanActivate from '../../utils/offer-can-activate'

export default {
  name: 'FeedOfferActivate',
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
      progress: false,
    }
  },
  computed: {
    activated() {
      return !!this.row.offer_id
    },
    canActivate() {
      return !this.activated && offerCanActivate(this.row)
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
        .then(response => {
          this.progress = false
          const [error] = response

          if(error) {
            this.responseNotify(response, 'create')
            return
          }
          this.activateFeedOffer({
            feedOfferId: this.row.id,
            payload: {
              acknowledgement: 'acknowledged',
            },
          }).then(resp => {
            const [err] = resp
            this.responseNotify(response, 'activate')
            if(!err) this.processor.getData()
          })
        })
    },
    responseNotify(response, action) {
      const [error,] = response
      if(error) {
        if(error.violations) {
          const violations = Object.keys(error.violations)
          violations.forEach(violation => {
            setTimeout(() => {
              this.$notify({
                type: 'error',
                title: `Unable to ${action === 'create' ? 'create global offer' : 'activate feed'}`,
                message: `${violation}: ${error.violations[violation][0]}`,
              })
            }, 50)
          })
        } else {
          this.$notify({
            type: 'error',
            title: `Unable to ${action === 'create' ? 'create global offer' : 'activate feed'}`,
            message: error.message,
          })
        }
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Successfully activated`,
        })
      }
      return !error
    }
  },
}
</script>

<template>
  <el-button
    v-if="canActivate"
    type="text"
    :class="$style.link"
    :loading="progress"
    @click.stop.prevent="onSubmit"
  >
    {{ `${progress ? '' : 'Activate'}` }}
  </el-button>
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
