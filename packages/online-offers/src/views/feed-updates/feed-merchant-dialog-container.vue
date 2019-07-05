<script>
import CellMixin from '@lib/components/data-table/cells/cell.mixin'
import MerchantCreate from './feed-merchant-create.vue'
import { mapActions } from 'vuex'
import ApiProcessor from '@lib/processors/api-processor'

export default {
  components: {
    MerchantCreate,
  },
  mixins: [CellMixin],
  props: {
    row: {
      type: Object,
      required: true,
    },
    processor: {
      type: ApiProcessor,
      required: true,
    },
  },
  data() {
    return {
      showCreate: false,
      showDetachDialog: false,
    }
  },
  computed: {
    merchant() {
      return this.row.merchant
    },
  },
  methods: {
    ...mapActions('merchants', ['detachMerchant']),
    onDetach() {
      this.detachMerchant({
        merchantId: this.merchant.id,
        feedmerchantId: this.row.id,
      }).then(() => this.processor.getData())
        .then(() => {
          this.showDetachDialog = false
          this.$notify({
            type: 'info',
            title: 'Detached',
            message: 'Successfuly detached',
          })
        })
    },
  },
}
</script>

<template>
  <div v-if="merchant">
    <div
      :class="$style.link"
      @click.stop.prevent="showDetachDialog = true"
    >
      Detach
    </div>
    <state-dialog
      :visible.sync="showDetachDialog"
      title="Detach Merchant"
      modal-append-to-body
      append-to-body
    >
      <el-icon
        slot="icon"
        name="warning"
      />
      <el-icon
        slot="subicon"
        :class="$style.subicon"
        name="delete"
      />
      <div :class="$style.msg">
        Are you sure you wish to detach<br> <b>{{ row.name }}</b> from <b>{{ merchant.name }}</b>?
      </div>
      <div
        class="modal__footer"
      >
        <el-button
          class="wide-button"
          type="danger"
          @click="onDetach"
        >
          Detach
        </el-button>
      </div>
    </state-dialog>
  </div>
  <div v-else>
    <div
      :class="$style.link"
      @click.stop="showCreate = true"
    >
      Create / Associate
    </div>
    <el-dialog
      ref="dialog"
      center
      title="Create / Associate Global Merchant"
      :visible.sync="showCreate"
      :class="$style.dialog"
      :processor="processor"
      top="5%"
      modal-append-to-body
      append-to-body
    >
      <merchant-create
        :key="Math.random()"
        :row="row"
        :processor="processor"
        @close-dialog="showCreate = false"
      />
    </el-dialog>
  </div>
</template>

<style lang="scss" module>
.link {
  color: var(--color-primary);
}

.dialog {
  cursor: default;

  :global {
    .el-dialog__headerbtn {
      top: rem(38px);
    }
  }
}
</style>
