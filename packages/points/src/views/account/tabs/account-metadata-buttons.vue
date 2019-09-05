<script>
import CellMixin from '@lib/components/data-table/cells/cell.mixin'
import AddMetadata from '../modals/add-metadata'

export default {
  components: {
    AddMetadata,
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
    onDelete() {
      this.progress = true
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

    <add-metadata
      id="xxx"
      :visible.sync="showEditModal"
      is-edit
    />

    <state-dialog
      :visible.sync="showDeleteDialog"
      title="Delete Data"
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
        Are you sure you wish to delete this data?
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
