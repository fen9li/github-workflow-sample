<script>
import MerchantCreate from './feed-merchant-create.vue'
import MerchantAssociate from './feed-merchant-associate.vue'

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
    }
  },
  computed: {
    merchant() {
      return this.row.merchant
    },
  },
  methods: {
    switchToCreate() {
      this.showAssociate = false
      this.showCreate = true
    },
  },
}
</script>

<template>
  <div v-if="!merchant">
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
