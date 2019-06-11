<script>
import EditModal from './coupon-edit'
import DeleteModal from './coupon-delete'

export default {
  components: {
    EditModal,
    DeleteModal,
  },
  data() {
    return {
      modal: {
        edit: false,
        delete: false,
      },
      coupon: {
        created_at: '2019-06-11T09:42:41.947Z',
        name: '10% Off Purchase',
        code: 'HE282',
        start_date: '2019-06-11T09:42:41.947Z',
        end_date: '2019-06-11T09:42:41.947Z',
        period: '6',
        numbber_in_use: '21',
      },
    }
  },
}
</script>

<template>
  <main-layout
    title="Coupon Details"
    back
  >
    <el-card>
      <el-row
        slot="header"
        type="flex"
        justify="space-between"
        align="middle"
      >
        <span>Information</span>

        <el-row type="flex">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            circle
            @click="modal.edit = true"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            circle
            @click="modal.delete = true"
          />
        </el-row>
      </el-row>

      <dl class="datalist">
        <dt>Date Created</dt>
        <dd>{{ coupon.created_at | dateTime }}</dd>

        <dt>Coupon Name</dt>
        <dd>{{ coupon.name }}</dd>

        <dt>Coupon Code</dt>
        <dd>{{ coupon.code }}</dd>

        <dt>Effective Start Date</dt>
        <dd>{{ coupon.start_date }}</dd>

        <dt>End Date</dt>
        <dd>{{ coupon.end_date }}</dd>

        <dt>Validity Period</dt>
        <dd>{{ coupon.period }}</dd>

        <dt>No. in use</dt>
        <dd>{{ coupon.numbber_in_use }}</dd>
      </dl>
    </el-card>


    <edit-modal
      v-if="modal.edit"
      :visible.sync="modal.edit"
      :coupon="coupon"
    />
    <delete-modal
      v-if="modal.delete"
      :visible.sync="modal.delete"
      :coupon="coupon"
    />
  </main-layout>
</template>
