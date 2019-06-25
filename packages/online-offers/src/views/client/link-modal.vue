<script>
import StaticProcessor from '@lib/processors/static-processor'
import table from './merchants.table'

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
    link: {
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
  watch: {
    items(value) {
      this.getData()
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.table.processor = new StaticProcessor({
        component: this,
        data: this.items,
      })
    },
    onClick() {
      // We haven't endpoint for bulk operation yet
      // For single {{baseUrl}}/catalogues/{{catalogueId}}/merchants/{{merchantId}}
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
        Are you sure you wish to {{ link ? 'link' : 'unlink' }} these Merchants from {{ name }}?
      </div>

      <table-layout
        :class="$style.table"
        shadow="never"
        table-name="clients-details"
        :processor="table.processor"
        :columns="table.unlinked.columns"
        :fragments="false"
        :hider="false"
        :table-controls="false"
      />

      <div :class="$style.link">
        <el-button
          type="primary"
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
