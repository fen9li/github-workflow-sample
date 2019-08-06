<script>
import StaticProcessor from '@lib/processors/static-processor'
import ApiProcessor from '@lib/processors/api-processor'
import merchantsModalTable from './merchants-modal.table.js'
import { mapActions } from 'vuex'

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
    link: {
      type: Boolean,
      default: false,
    },
    merchantsProcessor: {
      type: ApiProcessor,
      required: true,
    },
  },
  data() {
    return {
      table: merchantsModalTable,
      showModal: false,
      progress: false,
    }
  },
  computed: {
    merchantsCount() {
      const { length } = this.items

      return length > 1 ? `${length} merchants` : `${length} merchant`
    },
  },
  watch: {
    items() {
      this.getTableData()
    },
  },
  methods: {
    ...mapActions('catalogues', [
      'linkMerchantToCatalogue',
      'unlinkMerchantFromCatalogue',
    ]),
    getTableData() {
      this.table.processor = new StaticProcessor({
        component: this,
        data: this.items,
        disableQueryString: true,
      })
    },
    onClick() {
      const { merchantsCount } = this
      const merchants = this.items.map(i => i.id)
      let operation = 'linkMerchantToCatalogue'

      if (!this.link) {
        operation = 'unlinkMerchantFromCatalogue'
      }

      this.progress = true

      this[operation]({
        catalogueId: this.id,
        merchants,
      })
        .then(() => {
          this.showModal = false
          this.progress = false
          this.merchantsProcessor.getData()
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `${merchantsCount} successfully ${
              this.link ? 'linked' : 'unlinked'
            }`,
          })
        })
    },
  },
}
</script>

<template>
  <div data-test="link">
    <div
      :class="$style.buttonWrapper"
    >
      <el-button
        type="primary"
        class="el-button--wide"
        :disabled="!items || !items.length"
        @click="showModal = true"
      >
        {{ link ? 'Link' : 'Unlink' }}
      </el-button>
    </div>
    <el-dialog
      :visible.sync="showModal"
      :class="$style.dialog"
      :title="link ? 'Link Merchants' : 'Unlink Merchants'"
      modal-append-to-body
      append-to-body
      width="800px"
    >
      <div :class="$style.subtitle">
        Are you sure you wish to {{ link ? 'link' : 'unlink' }} these Merchants
        from {{ name }}?
      </div>

      <table-layout
        :class="$style.table"
        shadow="never"
        table-name="catalogues-details"
        :processor="table.processor"
        :columns="table.columns"
        :fragments="false"
        :hider="false"
        :table-controls="false"
      />

      <div :class="$style.link">
        <el-button
          type="primary"
          class="el-button--wide"
          :loading="progress"
          @click="onClick"
        >
          {{ link ? 'Link' : 'Unlink' }}
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
