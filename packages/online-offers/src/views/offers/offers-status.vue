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
    ...mapActions('offers', [
      'updateOffer',
    ]),
    ...mapMutations('offers', {
      updateTable: 'UPDATE_TABLE',
    }),
    onSwitch(event) {
      this.enabled = !this.enabled
      this.updateOffer({
        id: this.row.id,
        payload: {
          enabled: !this.row.enabled,
        },
      }).then(() => {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Status sussessfully changed`,
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
