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
      this.getData()
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions('catalogues', ['attachCatalogueMerchants', 'detachCatalogueMerchants']),
    getData() {
      this.table.processor = new StaticProcessor({
        component: this,
        data: this.items,
      })
    },
    onClick() {
      const { merchantsCount } = this
      const merchants = this.items.map(i => i.id)
      let operation = 'attachCatalogueMerchants'

      if (!this.link) {
        operation = 'detachCatalogueMerchants'
      }

      this[operation]({
        catalogueId: this.id,
        merchants,
      })
        .then(() => this.merchantsProcessor.getData())
        .then(() => {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `${merchantsCount} successfully ${
              this.link ? 'linked' : 'unlinked'
            }`,
          })

          this.showModal = false
        })
    },
  },
}
</script>

<template>
  <div>
    <div :class="$style.buttonWrapper">
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
