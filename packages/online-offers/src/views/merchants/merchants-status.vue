<script>
import cellToggle from '@lib/components/data-table/cells/cell-toggle.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'MerchantStatus',
  components: {
    cellToggle,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    ...mapActions('merchants', ['updateGlobalMerchant']),
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    async onSwitch() {
      this.enabled = !this.enabled

      await this.$nextTick()

      this.updateGlobalMerchant({
        merchantId: this.row.id,
        payload: {
          enabled: this.enabled,
        },
      }).then(response => {
        const [error,] = response
        if(error) {
          if(error.violations) {
            const violations = Object.keys(error.violations)
            violations.forEach(violation => {
              setTimeout(() => {
                this.$notify({
                  type: 'error',
                  title: `Unable to change Merchant status`,
                  message: `${violation}: ${error.violations[violation][0]}`,
                })
              }, 50)
            })
          } else {
            this.$notify({
              type: 'error',
              title: `Unable to change Merchant status`,
              message: error.message,
            })
          }
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `Merchant status successfully changed`,
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
    :disabled="disabled"
    @click="onSwitch"
  />
</template>
