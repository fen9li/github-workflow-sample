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
    }
  },
  computed: {
    activated() {
      return this.row.offer_id !== null
    },
  },
  methods: {
    ...mapActions('offers', [
      'createOffer',
    ]),
    onSubmit() {
      this.createOffer({
        feed_offer: this.row.external_id,
        name: this.row.name,
      }).then(() => this.processor.getData())
        .then(() => {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: 'Successfuly activated',
          })
        })
    },
  },
}
</script>

<template>
  <div>
    <div
      v-if="!activated"
      :class="$style.link"
      @click.stop.prevent="onSubmit"
    >
      Associate
    </div>
  </div>
</template>

<style lang="scss" module>
.link {
  color: var(--color-primary);
  cursor: pointer;
}
</style>
