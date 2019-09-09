<script>
export default {
  name: "EventParamModalSuper",
  props: {
    param: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      progress: false,
      form: {

      },
      rules: {},
      types: [
        {
          name: 'String',
          value: 'string',
        },
        {
          name: 'Object',
          value: 'object',
        },
        {
          name: 'Array',
          value: 'array',
        },
      ]
    }
  },
  mounted() {
    if (this.param) this.form = { ...this.param }
  },
  methods: {
    onSubmit() {
      this.$emit('close-modal', this.form)
    }
  },
}
</script>

<template>
  <el-dialog
    :title="param ? 'Edit Parameter' : 'Add Parameter'"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item
        label="Name"
        required
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="Type"
        required
      >
        <el-select v-model="form.type">
          <el-option
            v-for="(item, index) in types"
            :key="index"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Event Type"
        required
      >
        <el-radio-group
          v-model="form.required"
        >
          <el-radio
            :label="true"
            :class="$style.radio"
          >
            Yes
          </el-radio>
          <el-radio
            :label="false"
            :class="$style.radio"
          >
            No
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="Default"
        required
      >
        <el-input v-model="form.defaulValue" />
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

</style>
