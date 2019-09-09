<script>
import { mapActions, mapState } from 'vuex'
import { formatDate } from '@lib/utils/format-date'
import get from 'lodash/get'
import DataBox from '~/components/data-box'
import DataList from '~/components/data-list'
import EditModal from './modals/membership-modal'
import DeleteModal from './modals/delete-modal'
import ForbidDeleteModal from './modals/forbid-delete-modal'

export default {
  name: "MembershipPoints",
  components: {
    DataBox,
    DataList,
    EditModal,
    DeleteModal,
    ForbidDeleteModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      modals: {
        edit: false,
        delete: false,
        forbid: false,
      },
    }
  },
  computed: {
    ...mapState('membership', ['membership']),
    status() {
      return get(this.membership, 'status', '')
    },
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapActions('membership', ['getMembership']),
    async getData() {
      const [, result] = await this.getMembership(this.id)
      if (result) {
        this.loading = false
      }
    },
    onDelete() {
      // Check if in use
      this.modals.delete = true
      // this.modals.forbid = true
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
  },
}
</script>

<template>
  <main-layout
    title="Membership"
    :loading="loading"
    back
  >
    <el-dropdown
      slot="header"
      trigger="click"
    >
      <div :class="$style.drop">
        <i class="el-icon-more" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modals.edit = true">
          Edit Membership
        </el-dropdown-item>
        <el-dropdown-item @click.native="onDelete">
          Delete Membership
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <data-box
      header="Membership Details"
      :status="status"
    >
      <data-list>
        <dt>Date Created</dt>
        <dd>{{ formatDate(membership.createdAt) || '-' }}</dd>

        <dt>Membership ID</dt>
        <dd>{{ membership.id || '-' }}</dd>

        <dt>Membership Name</dt>
        <dd>{{ membership.name || '-' }}</dd>

        <dt>Membership Slug</dt>
        <dd>{{ membership.slug || '-' }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ membership.providerName || '-' }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(membership.updatedAt) || '-' }}</dd>

        <dt>Logo URL</dt>
        <dd>{{ membership.url || '-' }}</dd>
      </data-list>
    </data-box>
    <edit-modal
      v-if="modals.edit"
      :visible.sync="modals.edit"
      :membership="membership"
      @done="modals.edit = false"
    />

    <delete-modal
      v-if="modals.delete"
      :id="membership.id"
      :visible.sync="modals.delete"
    />

    <forbid-delete-modal
      v-if="modals.forbid"
      :visible.sync="modals.forbid"
    />
  </main-layout>
</template>


<style lang="scss" module>
.drop {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  font-size: 1.4rem;
  color: var(--color-primary-lightest);
  cursor: pointer;
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-primary-transparent);
  }

  i {
    transform: rotate(90deg);
  }
}
</style>
