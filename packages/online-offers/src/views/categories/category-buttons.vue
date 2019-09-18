<script>
import CellMixin from '@lib/components/data-table/cells/cell.mixin'
import CategoryModal from './category-modal'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    CategoryModal,
  },
  mixins: [CellMixin],
  data() {
    return {
      showEditModal: false,
      showDeleteDialog: false,
      progress: false,
    }
  },
  methods: {
    ...mapActions('categories', ['deleteCategory']),
    ...mapMutations('categories', {
      setCategories: 'SET_CATEGORIES',
    }),
    onDelete() {
      this.progress = true
      this.deleteCategory(this.row.id).then(response => {
        this.progress = false

        this.$notifier({
          response,
          errorTitle: 'Unable to delete category',
          successMsg: 'Category successfully deleted'
        }).then(success => {
          if(success) {
            this.showDeleteDialog = false
            this.processor.getData()
              .then(data => this.setCategories(data))
          }
        })
      })
    },
  },
}
</script>

<template>
  <div :class="$style.buttons">
    <el-button
      icon="el-icon-edit"
      type="primary"
      circle
      plain
      size="mini"
      @click.stop="showEditModal = true"
    />
    <el-button
      icon="el-icon-delete"
      type="danger"
      plain
      circle
      size="mini"
      @click.stop="showDeleteDialog = true"
    />

    <category-modal
      slot="header"
      :visible.sync="showEditModal"
      :item="row"
      :processor="processor"
      modal-append-to-body
      append-to-body
      @close-modal="showEditModal = false"
    />

    <state-dialog
      :visible.sync="showDeleteDialog"
      title="Delete Category"
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
        Are you sure you wish to delete this category?
      </div>
      <div class="modal__footer">
        <el-button
          type="danger"
          :loading="progress"
          class="el-button--wide"
          @click="onDelete"
        >
          Delete
        </el-button>
      </div>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>
.buttons {
  display: flex;
}
</style>
