<script>
export default {
  name: 'ManualAdjustment',
  data() {
    return {
      progress: false,
      form: {
        type: '',
        points: 1,
      },
      rules: {
        type: {
          required: true,
          message: 'Type select is required',
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        this.progress = true
      })
    },
    onChange(value) {
      this.points = value
    }
  },
}
</script>

<template>
  <el-dialog
    title="Update Membership"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :class="$style.form"
      :model="form"
      label-position="top"
    >
      <el-form-item
        :class="$style.radio"
        label="Type"
        prop="type"
        required
      >
        <el-radio-group
          v-model="form.type"
        >
          <el-radio
            label="Earn"
          />
          <el-radio
            label="Burn"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="Points"
      >
        <el-input-number
          v-model="form.points"
          :min="1"
          :max="10"
          size="small"
          controls-position="right"
          @change="onChange"
        />
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

.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.radio {
  flex-grow: 1;
}

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
