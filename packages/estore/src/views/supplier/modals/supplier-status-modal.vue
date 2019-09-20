<script>
import { mapActions } from 'vuex'

export default {
  name: 'SupplierStatusModal',
  props: {
    supplier: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      progress: false,
      form: {
        active: false,
      }
    }
  },
  computed: {
    status() {
      return `Supplier ${this.form.active ? 'Available' : 'Not Available'}`
    }
  },
  created() {
    const { form } = this
    const {
      active,
    } = this.supplier
    form.active = active
  },
  methods: {
    ...mapActions('supplier', ['updateSupplier']),
    async onSubmit() {
      this.progress = true
      const [, error] = await this.updateSupplier({
        supplierId: this.supplier.id,
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
    title="Update Supplier Status"
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
        prop="active"
        required
        :class="$style.switch"
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
      <el-alert
        v-if="!form.active"
        title="Changing the Status to Unavailable will automatically make any contracts associated with the Supplier Inactive."
        type="info"
        show-icon
        :closable="false"
        :class="$style.alert"
      />
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

.switch {
  display: flex;
  :global {
    .el-form-item__content {
      width: rem(200px);
      margin-right: auto;
      margin-left: auto;
    }
  }
}

.status {
  margin-left: rem(14px);
}

.alert {
  margin-bottom: rem(22px);
  :global {
    .el-alert__title {
      font-size: 85%;
    }
  }
}
</style>
