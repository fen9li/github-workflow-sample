<script>
import { mapActions } from 'vuex'

export default {
  name: 'DeleteContractModal',
  props: {
    contract: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions('contract', ['deleteContract']),
    async onDeleteClick() {
      this.loading = true

      await this.deleteContract(this.contract.id)

      this.$notify({
        type: 'success',
        title: 'Success',
        message: `Contract has been successfully deleted`,
      })

      this.$router.replace({ name: 'product-categories' })
    },
  },
}
</script>

<template>
  <state-dialog
    title="Delete Contract"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      name="link"
    />
    <el-icon
      slot="subicon"
      :class="$style.subicon"
      name="delete"
      circle
    />
    <div>
      Are you sure you wish to delete
      this Contract?
      This will result in all associated Provider
      Products also being Deleted.
    </div>
    <div class="modal__footer">
      <el-button
        :loading="loading"
        :disabled="loading"
        type="primary"
        class="el-button--wide"
        @click="onDeleteClick"
      >
        Delete
      </el-button>
    </div>
  </state-dialog>
</template>

<style lang="scss" module>
  .subicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    color: white;
    background-color: var(--color-error);
    border-radius: 50%;
  }
</style>
