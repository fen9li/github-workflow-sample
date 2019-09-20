<script>
import { mapActions } from 'vuex'

export default {
  name: 'SupplierEditModal',
  props: {
    supplier: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      progress: false,
      form: {
        name: null,
        currency: 'AUD',
        active: false,
      }
    }
  },
  computed: {
    isCreate() {
      return !Object.keys(this.supplier).length
    },
    title() {
      return `${this.isCreate ? 'Create' : 'Edit'} Supplier`
    },
    status() {
      return `Supplier ${this.form.active ? 'Available' : 'Not Available'}`
    }
  },
  created() {
    if (!this.isCreate) {
      const { form } = this
      const {
        name,
        currency,
        active,
      } = this.supplier
      form.name = name
      form.currency = currency
      form.active = active
    }
  },
  methods: {
    ...mapActions('supplier', ['createSupplier', 'updateSupplier']),
    async onSubmit() {
      const formValid = await this.$refs.form.validate().catch(() => false)
      if (!formValid) {
        return
      }
      const action = this.supplierId ? 'updateSupplier' : 'createSupplier'
      this.progress = true
      const [, error] = await this[action]({
        supplierId: this.supplier.id || null,
        form: this.form,
      })
      if (error) {
        this.$notify({
          type: 'error',
          title: 'Error',
          message: error.message,
        })
      } else {
        this.$notify({
          type: 'success',
          title: 'Success',
          message: `Supplier successfuly ${this.isCreate ? 'created' : 'updated'}`,
        })
      }
      this.$emit('close-modal')
      this.progress = false
    },
  },
}
</script>

<template>
  <el-dialog
    :title="title"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      :disabled="progress"
    >
      <el-form-item
        label="Supplier Name"
        prop="label"
        required
      >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="Currency"
        prop="label"
      >
        <el-input
          v-model="form.currency"
          disabled
        />
      </el-form-item>
      <el-form-item
        v-if="isCreate"
        prop="active"
        required
      >
        <el-switch
          v-model="form.active"
          active-color="#13ce66"
          inactive-color="#a7a7a7"
        />
        <span
          :class="$style.status"
          :style="{'color': `${form.active ? '#13ce66' : '#a7a7a7'}`}"
        >
          {{ status }}
        </span>
      </el-form-item>
      <el-button
        type="primary"
        :class="$style.button"
        :loading="progress"
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

.status {
  margin-left: rem(14px);
}
</style>
