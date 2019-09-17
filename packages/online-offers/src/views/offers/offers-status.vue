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
    ...mapActions('offers', ['updateGlobalOffer']),
    onSwitch() {
      this.enabled = !this.enabled

      this.updateGlobalOffer({
        id: this.row.id,
        payload: {
          enabled: !this.row.enabled,
        },
      })
        .then(response => {
          const [error] = response
          if(error) {
            if(error.violations) {
              const violations = Object.keys(error.violations)
              violations.forEach(violation => {
                setTimeout(() => {
                  this.$notify({
                    type: 'error',
                    title: `Unable to change status`,
                    message: `${violation}: ${error.violations[violation][0]}`,
                  })
                }, 50)
              })
            } else {
              this.$notify({
                type: 'error',
                title: `Unable to change status`,
                message: error.message,
              })
            }
          } else {
            this.$notify({
              type: 'success',
              title: 'Success',
              message: `Status successfully changed to ${
                this.enabled ? 'enabled' : 'disabled'
              }`,
            })
          }
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
