<script>
export default {
  name: 'AddBadge',
  data() {
    return {
      progress: false,
      form: {
        badge: ''
      },
      badges: [
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
    title="Add Badge"
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
      <el-form-item>
        <el-select v-model="form.badge">
          <el-option
            v-for="(item, index) in badges"
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
