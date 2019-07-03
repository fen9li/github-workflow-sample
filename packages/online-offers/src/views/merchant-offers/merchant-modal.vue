<script>
import StaticProcessor from '@lib/processors/static-processor'
import table from './merchant-modal.table'
import { mapActions, mapMutations } from 'vuex'

export default {
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
  },
  data() {
    return {
      table: table(this),
      showModal: false,
    }
  },
  computed: {
    offersCount() {
      return this.items.length > 1 ? `${this.items.length} offers` : `${this.items.length} offer`
    },
  },
  watch: {
    items(value) {
      this.getData()
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    ...mapActions('offers', [
      'updateOffer',
    ]),
    getData() {
      this.table.processor = new StaticProcessor({
        component: this,
        data: this.items,
      })
    },
    onClick() {
      // We haven't endpoint for bulk operation yet
      // For single {{baseUrl}}/offers/{{offersId}}
      this.items.forEach(item => {
        this.updateOffer({
          id: item.id,
          enabled: !item.enabled,
        })
      })
      this.updateTable(true)
      this.$notify({
        type: 'success',
        title: 'Success',
        message: `${this.offersCount} sussessfully ${this.activate ? 'activated' : 'deactivated'}`,
      })
      this.showModal = false
    },
  },
}
</script>

<template>
  <div>
    <div :class="$style.buttonWrapper">
      <el-button
        type="primary"
        :disabled="!items || !items.length"
        @click="showModal = true"
      >
        {{ activate ? 'Activate' : 'Deactivate' }}
      </el-button>
    </div>
    <el-dialog
      :visible.sync="showModal"
      :class="$style.dialog"
      :title="activate ? 'Activate Offers' : 'Deactivate Offers'"
      modal-append-to-body
      append-to-body
      width="800px"
    >
      <div :class="$style.subtitle">
        Are you sure you wish to {{ activate ? 'activate' : 'deactivate' }} these Offers from {{ name }}?
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
          @click="onClick"
        >
          {{ activate ? 'Activate' : 'Deactivate' }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
  .buttonWrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: rem(0 48px 16px 0);
  }

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
