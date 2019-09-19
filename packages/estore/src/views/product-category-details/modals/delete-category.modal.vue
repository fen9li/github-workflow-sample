<script>
import { mapActions } from 'vuex'

export default {
  name: 'DeleteCategoryModal',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    canDelete() {
      return true
    },
    icon() {
      if (this.canDelete) {
        return 'document'
      }

      return 'warning'
    },
    title() {
      if (this.canDelete) {
        return 'Delete Product Category Hierarchy'
      }

      return 'Important'
    },
  },
  methods: {
    ...mapActions('category', ['deleteCategory']),
    async onDeleteClick() {
      const { name, id } = this.category

      this.loading = true

      await this.deleteCategory(id)

      this.$notify({
        type: 'success',
        title: 'Success',
        message: `${name} category has been successfully deleted`,
      })

      this.$router.replace({ name: 'product-categories' })
    },
  },
}
</script>

<template>
  <state-dialog
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-icon
      slot="icon"
      :name="icon"
    />
    <el-icon
      v-if="canDelete"
      slot="subicon"
      :class="$style.subicon"
      name="delete"
      circle
    />
    <template v-if="canDelete">
      <div>
        Are you sure you wish to delete this Default Product Category Hierarchy?
      </div>
      <div class="modal__footer">
        <el-button
          :loading="loading"
          :disabled="loading"
          type="primary"
          class="el-button--wide"
          @click="onDeleteClick"
        >
          Delete Product Category Hierarchy
        </el-button>
      </div>
    </template>
    <div v-else>
      Product Category Hierarchy cannot be deleted because it is in use with at
      least one Provider.
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
