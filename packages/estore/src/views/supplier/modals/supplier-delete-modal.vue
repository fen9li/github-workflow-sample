<script>
import { mapActions } from 'vuex'

export default {
  name: 'SupplierDeleteModal',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      progress: false,
    }
  },
  methods: {
    ...mapActions('supplier', [
      'deleteSupplier',
    ]),
    async onSubmit() {
      this.progress = true
      await this.deleteSupplier(this.id)
      this.progress = false
      this.$emit('close-modal')
      this.$notify({
        type: 'success',
        title: 'Supplier deleted',
        message: 'Supplier successfully deleted',
      })
      this.$router.push({
        name: 'suppliers',
      })
    },
  },
}
</script>

<template>
  <state-dialog
    title="Delete Supplier"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="warning"
    />
    <el-icon
      slot="subicon"
      name="delete"
    />
    <div :class="$style.msg">
      Are you sure you wish to delete this supplier?
    </div>
    <div class="modal__footer">
      <el-button
        type="danger"
        :loading="progress"
        class="el-button--wide"
        @click.stop="onSubmit"
      >
        Delete
      </el-button>
    </div>
  </state-dialog>
</template>

<style lang="scss" module>
.msg {
  word-break: normal;
}
</style>
