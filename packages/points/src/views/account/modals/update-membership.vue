<script>
export default {
  name: 'UpdateMembership',
  data() {
    return {
      progress: false,
      form: {
        membership: ''
      },
      memberships: [
        {
          name: 'Lorem',
          value: 0,
        },
        {
          name: 'Ipsum',
          value: 1,
        },
        {
          name: 'Sign',
          value: 1,
        },
      ]
    }
  },
  methods: {
    onSubmit() {
      this.progress = true
    }
  },
}
</script>

<template>
  <el-dialog
    title="Update Membership"
    v-bind="$attrs"
    modal-append-to-body
    append-to-body
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <el-form-item
        label="membership"
      >
        <el-select v-model="form.membership">
          <el-option
            v-for="(item, index) in memberships"
            :key="index"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        :class="$style.button"
        :loading="progress"
        :disabled="progress"
        class="el-button--wide"
        @click.stop="onSubmit"
      >
        Save
      </el-button>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" module>
.button {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

:global {
  .el-input__count-inner {
    line-height: 1;
  }
}
</style>
