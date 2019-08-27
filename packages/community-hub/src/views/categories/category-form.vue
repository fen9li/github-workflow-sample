<script>
export default {
  name: 'CategoryForm',
  props: {
    category: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      isEdit: this.$route.params.edit,
      form: {
        category_name: null,
      },
      rules: {
        category_name: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
      },
      showDeleteDialog: false,
    }
  },
  mounted() {
    if (this.isEdit) {
      this.form = { ...this.category }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$notify({
            type: 'success',
            title: 'Success',
            message: this.isEdit ? 'Changes successfully saved.' : 'Category successfully added.',
          })
        } else {
          return false
        }
      })
    },
    onCancel() {
      if (this.isEdit) {
        this.form = { ...this.category }
      } else {
        const keys = Object.keys(this.form)

        keys.forEach(key => {
          this.form[key] = null
        })
      }

      this.$refs.form.$children[0].clearValidate()
    },
    onDelete() {
      this.showDeleteDialog = false

      this.$notify({
        type: 'success',
        title: 'Success',
        message: 'Category successfully deleted.',
      })
    }
  },
}
</script>

<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top"
      class="card-form"
    >
      <el-form-item
        label="Category Name"
        prop="category_name"
      >
        <el-input v-model="form.category_name" />
      </el-form-item>
    </el-form>
    <div class="card-footer">
      <div v-if="isEdit">
        <el-button
          type="danger"
          @click.stop="showDeleteDialog = true"
        >
          Delete category
        </el-button>
      </div>
      <div>
        <el-button @click="onCancel">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Save category
        </el-button>
      </div>
    </div>

    <state-dialog
      :visible.sync="showDeleteDialog"
      title="Delete Category"
    >
      <el-icon
        slot="icon"
        name="warning"
      />
      <el-button
        slot="subicon"
        icon="el-icon-delete"
        type="danger"
        circle
      />
      <div :class="$style.msg">
        Are you sure you want to delete this category?
      </div>
      <div class="modal__footer">
        <el-button
          type="danger"
          class="el-button--wide"
          @click="onDelete"
        >
          Delete category
        </el-button>
      </div>
    </state-dialog>
  </div>
</template>

<style lang="scss" module>
  .msg {
    text-align: center;
    white-space: nowrap;
  }

  .subicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 16px;
    color: var(--color-primary-text);
    background-color: var(--color-error);
    border-radius: 50%
  }
</style>
