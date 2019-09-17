<script>
import StaticProcessor from '@lib/processors/static-processor'
import ApiProcessor from '@lib/processors/api-processor'
import merchantModalTable from './merchant-modal.table'
import { mapActions } from 'vuex'

export default {
  name: 'MerchantModal',
  props: {
    name: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      default: null,
    },
    activate: {
      type: Boolean,
      default: false,
    },
    offersProcessor: {
      type: ApiProcessor,
      required: true,
    },
  },
  data() {
    return {
      progress: false,
      table: merchantModalTable,
      showModal: false,
    }
  },
  computed: {
    offersCount() {
      const { length } = this.items

      return length > 1 ? `${length} offers` : `${length} offer`
    },
  },
  watch: {
    items() {
      this.getData()
    },
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapActions('offers', ['toggleGlobalOffersActive']),
    getData() {
      this.table.processor = new StaticProcessor({
        component: this,
        data: this.items,
        disableQueryString: true,
      })
    },
    onClick() {
      const { offersCount } = this
      const offers = this.items.map(i => i.id)

      this.progress = true

      this.toggleGlobalOffersActive({
        offers,
        enabled: this.activate,
      })
        .then(response => {
          this.progress = false
          const [error] = response
          if(error) {
            if(error.violations) {
              const violations = Object.keys(error.violations)
              violations.forEach(violation => {
                setTimeout(() => {
                  this.$notify({
                    type: 'error',
                    title: `Unable to ${this.activate ? 'activate' : 'deactivate'} offer`,
                    message: `${violation}: ${error.violations[violation][0]}`,
                  })
                }, 50)
              })
            } else {
              this.$notify({
                type: 'error',
                title: `Unable to ${this.activate ? 'activate' : 'deactivate'} offer`,
                message: error.message,
              })
            }
          } else {
            this.showModal = false
            this.$notify({
              type: 'success',
              title: 'Success',
              message: `${offersCount} successfully ${
                this.activate ? 'activated' : 'deactivated'
              }`,
            })
            this.offersProcessor.getData()
          }
        })
    },
  },
}
</script>

<template>
  <div data-test="merhant">
    <el-button
      class="el-button--small"
      :type="activate ? 'success' : 'danger'"
      :disabled="!items || !items.length"
      @click="showModal = true"
    >
      {{ activate ? 'Activate' : 'Deactivate' }}
    </el-button>
    <el-dialog
      :visible.sync="showModal"
      :class="$style.dialog"
      :title="activate ? 'Activate Offers' : 'Deactivate Offers'"
      modal-append-to-body
      append-to-body
      width="920px"
    >
      <div :class="$style.subtitle">
        Are you sure you wish to
        {{ activate ? 'activate' : 'deactivate' }} these Offers from {{ name }}?
      </div>

      <table-layout
        :class="$style.table"
        shadow="never"
        table-name="offers-details"
        :processor="table.processor"
        :columns="table.columns"
        :fragments="false"
        :hider="false"
        :table-controls="false"
      />

      <div :class="$style.link">
        <el-button
          type="primary"
          :loading="progress"
          @click="onClick"
        >
          {{ activate ? 'Activate' : 'Deactivate' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.dialog {
  :global {
    .el-dialog {
      max-width: none !important;
    }
  }
}

.subtitle {
  margin-bottom: rem(32px);
  text-align: center;
}

.table {
  box-shadow: none !important;

  :global {
    .el-card__body > div {
      padding: 0;
    }
  }
}

.link {
  display: flex;
  justify-content: center;
}
</style>
