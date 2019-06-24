<script>
import MerchantCreate from './feed-merchant-create.vue'
import MerchantAssociate from './feed-merchant-associate.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    MerchantCreate,
    MerchantAssociate,
  },
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showAssociate: false,
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
    ...mapActions('merchants', [
      'detachMerchant',
    ]),
    ...mapMutations('merchants', {
      updateTable: 'UPDATE_TABLE',
    }),
    switchToCreate() {
      this.showAssociate = false
      this.showCreate = true
    },
    onDetach() {
      this.detachMerchant({
        merchantId: this.merchant.id,
        feedmerchantId: this.row.id,
      }).then(() => {
        this.showDetachDialog = false
        this.updateTable()
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
      @click.stop="showAssociate = true"
    >
      Associate
    </div>
    <el-dialog
      ref="dialog"
      center
      title="Associate Merchant"
      :visible.sync="showAssociate"
      :class="$style.dialog"
      width="33%"
      top="30vh"
      modal-append-to-body
      append-to-body
    >
      <merchant-associate
        :row="row"
        @close-dialog="showAssociate = false"
        @create-new="switchToCreate"
      />
    </el-dialog>
    <el-dialog
      ref="dialog"
      center
      title="Create Global Merchant"
      :visible.sync="showCreate"
      :class="$style.dialog"
      width="33%"
      top="5%"
      modal-append-to-body
      append-to-body
    >
      <merchant-create
        :row="row"
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
}
</style>
