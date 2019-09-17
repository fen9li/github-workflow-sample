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
      type: [ApiProcessor, Object],
      required: true,
    },
    showButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showCreate: false,
      showDetachDialog: false,
      progress: false
    }
  },
  computed: {
    merchant() {
      return this.row.merchant
    },
    commissionIsMissing() {
      const { commission = {} } = this.row.map
      const { min, base, max } = commission
      // eslint-disable-next-line eqeqeq
      const emptyCommission = min == 0 && base == 0 && max == 0
      return emptyCommission
    },
    canAttach() {
      return this.row.status === 'active'
    }
  },
  methods: {
    ...mapActions('feedMerchants', [
      'detachFeedMerchantFromGlobamMerchant'
    ]),
    onDetach() {
      this.progress = true
      this.detachFeedMerchantFromGlobamMerchant({
        merchantId: this.merchant.id,
        feedmerchantId: this.row.id,
      }).then(response => {
        this.progress = false

        const [error,] = response
        if(error) {
          if(error.violations) {
            const violations = Object.keys(error.violations)
            violations.forEach(violation => {
              setTimeout(() => {
                this.$notify({
                  type: 'error',
                  title: `Unable to detach`,
                  message: `${violation}: ${error.violations[violation][0]}`,
                })
              }, 50)
            })
          } else {
            this.$notify({
              type: 'error',
              title: `Unable to detach`,
              message: error.message,
            })
          }
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: `Successfully detached`,
          })
          this.showDetachDialog = false
          this.processor.getData()
        }
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
      <el-button
        v-if="showButton"
        type="danger"
      >
        Detach
      </el-button>
      <span v-else>
        Detach
      </span>
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
        Are you sure you wish to detach<br> <b>{{ row.map.name }}</b> from <b>{{ merchant.name }}</b>?
      </div>
      <div
        class="modal__footer"
      >
        <el-button
          type="danger"
          :loading="progress"
          class="el-button--wide"
          @click.stop.prevent="onDetach"
        >
          Detach
        </el-button>
      </div>
    </state-dialog>
  </div>
  <div v-else-if="canAttach">
    <div
      :class="$style.link"
      @click.stop.prevent="showCreate = true"
    >
      <el-button
        v-if="showButton"
        type="success"
      >
        Create / Associate
      </el-button>
      <span v-else>
        Create / Associate
      </span>
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
