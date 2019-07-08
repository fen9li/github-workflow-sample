<script>
import cellToggle from '@lib/components/data-table/cells/cell-toggle.vue'
import CellMixin from '@lib/components/data-table/cells/cell.mixin'
import { mapActions } from 'vuex'

export default {
  components: {
    cellToggle,
  },
  mixins: [CellMixin],
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
    ...mapActions('offers', ['updateOffer']),
    onSwitch() {
      this.enabled = !this.enabled

      this.updateOffer({
        id: this.row.id,
        payload: {
          enabled: !this.row.enabled,
        },
      })
        .then(() =>
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `Status successfully changed to ${
              this.enabled ? 'enabled' : 'disabled'
            }`,
          })
        )
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
