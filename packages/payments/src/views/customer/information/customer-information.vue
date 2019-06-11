<script>
import EditModal from './customer-edit'
import DeleteModal from './customer-delete'

export default {
  name: 'CustomerInformation',
  components: {
    EditModal,
    DeleteModal,
  },
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      modal: {
        edit: false,
        delete: false,
      },
    }
  },
}
</script>

<template>
  <el-card>
    <el-row
      slot="header"
      type="flex"
      justify="space-between"
      align="middle"
    >
      <span>Information</span>
    </el-row>

    <dl class="datalist">
      <dt>Date Created</dt>
      <dd>{{ customer.created_at | dateTime }}</dd>

      <dt>Customer ID</dt>
      <dd>{{ customer.id }}</dd>

      <dt>Company Name</dt>
      <dd>{{ customer.companyName || '-' }}</dd>

      <dt>Company ABN</dt>
      <dd>{{ customer.companyAbn || '-' }}</dd>

      <dt>First Name</dt>
      <dd>{{ customer.first_name }}</dd>

      <dt>Last Name</dt>
      <dd>{{ customer.last_name }}</dd>

      <dt>Email</dt>
      <dd>{{ customer.email }}</dd>

      <dt>Telephone</dt>
      <dd>{{ customer.mobile }}</dd>

      <dt>Address</dt>
      <dd>{{ customer.address || '-' }}</dd>
    </dl>

    <edit-modal
      v-if="modal.edit"
      :visible.sync="modal.edit"
      :customer="customer"
    />
    <delete-modal
      v-if="modal.delete"
      :visible.sync="modal.delete"
      :customer="customer"
    />
  </el-card>
</template>

<style lang="scss" module>


.subscriptions {
  margin: 1rem 0;
}

.divider {
  margin: 0 var(--size-card-spacing);
}
</style>
