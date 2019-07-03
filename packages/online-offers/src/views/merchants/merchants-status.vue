<script>
import cellToggle from '@lib/components/data-table/cells/cell-toggle.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    cellToggle,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      enabled: this.row.enabled,
    }
  },
  computed: {
    isEnabled() {
      return this.enabled
    },
  },
  methods: {
    ...mapActions('merchants', [
      'updateMerchant',
    ]),
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    async onSwitch(event) {
      this.enabled = !this.enabled
      await this.$nextTick()
      this.updateMerchant({
        merchantId: this.row.id,
        payload: {
          enabled: this.enabled,
        },
      }).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Merchant status sussessfully changed`,
        })
      })
    },
  },
}
</script>

<template>
  <cell-toggle
    :enabled="isEnabled"
    @click="onSwitch"
  />
</template>

