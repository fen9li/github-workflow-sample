<script>
import StateDialog from '@components/state-dialog/state-dialog'

export default {
  name: 'UserAccessDelete',
  components: {
    StateDialog,
  },
  inheritAttrs: false,
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
    }
  },
  methods: {
    onSubmit() {
      // some api request here

      this.dialogVisible = true
    },
  },
}
</script>

<template>
  <div>
    <el-button
      type="text"
      size="small"
      icon="el-icon-delete"
      :class="$style.trigger"
      plain
      circle
      @click="dialogVisible = true"
    />
    <state-dialog
      :visible.sync="dialogVisible"
      title="Delete User"
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
        Are you sure you wish to delete this user?
      </div>
      <div
        class="modal__footer"
      >
        <el-button
          class="wide-button"
          type="danger"
          @click="onSubmit"
        >
          Delete
        </el-button>
      </div>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>
  @import '@design';

  .trigger {
    font-size: 20px;
    color: var(--color-error);

    &:hover {
      color: var(--color-error) !important;
      border-color: var(--color-error) !important;
    }
  }

  .msg {
    text-align: center;
  }

  .subicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    font-size: 18px;
    color: var(--color-primary-text);
    background-color: var(--color-error);
    border-radius: 51%
  }
</style>
