<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  props: {
    row: {
      type: Object,
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
      return this.row.status === 'active'
    },
  },
  methods: {
    ...mapActions('offers', [
      'createOffer',
    ]),
    ...mapMutations('offers', {
      updateTable: 'UPDATE_TABLE',
    }),
    async onSubmit() {
      const [error, response] = await this.createOffer({
        feed_offer: this.row.external_id,
      })
      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: 'Successfuly activated',
        })
        this.updateTable()
      }
      if (error) {
        console.error('Error while requesting data', error)
      }
    },
  },
}
</script>

<template>
  <div v-if="!activated">
    <div
      :class="$style.link"
      @click.stop.prevent="onSubmit"
    >
      Create
    </div>
  </div>
</template>

<style lang="scss" module>
.link {
  color: var(--color-primary);
}
</style>
