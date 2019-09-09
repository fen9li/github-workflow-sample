<script>
import { formatDate } from '@lib/utils/format-date'
import DataBox from '~/components/data-box'
import DataList from '~/components/data-list'
import get from 'lodash/get'
import { mapActions } from 'vuex'

import BadgeEditModal from './modals/badge-edit-modal'
import BadgeArchiveModal from './modals/badge-archive-modal'

export default {
  name: 'BadgeDetail',
  components: {
    DataBox,
    DataList,
    BadgeEditModal,
    BadgeArchiveModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      badge: null,
      modal: {
        edit: false,
        archive: false,
      },
    }
  },
  computed: {
    title() {
      return get(this.badge, 'name', '')
    },
    status() {
      const status = get(this.badge, 'status', 'inactive')
      return status
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions('badge', [
      'getBadge',
    ]),
    async fetchData() {
      this.loading = true

      const [error, response] = await this.getBadge(this.id)

      if (error) {
        this.$router.replace({ name: 'badges' })
      }
      this.badge = response

      this.loading = false
    },
    formatDate(value) {
      return formatDate(value, 'DD/MM/YYYY hh:mm')
    },
    onEditSuccess(badge) {
      this.badge = badge
      this.modal.edit = false
    },
    async onArchiveSuccess() {
      this.modal.archive = false
    },
  },
}
</script>

<template>
  <main-layout
    :title="title"
    :loading="loading"
    :back="{ name: 'badges' }"
  >
    <el-dropdown
      slot="header"
      trigger="click"
    >
      <div :class="$style.drop">
        <i class="el-icon-more" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="modal.edit = true">
          Edit Badge
        </el-dropdown-item>
        <el-dropdown-item @click.native="modal.archive = true">
          Archive Badge
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <data-box
      header="Badge Details"
      :status="status"
    >
      <data-list v-if="!loading">
        <dt>Date Created</dt>
        <dd>{{ formatDate(badge.createdAt) }}</dd>

        <dt>Badge last earned on</dt>
        <dd>{{ formatDate(badge.earnedOn) }}</dd>

        <dt>Badge ID</dt>
        <dd>{{ badge.id || '-' }}</dd>

        <dt>Badge Name</dt>
        <dd>{{ badge.name || '-' }}</dd>

        <dt>Badge Logo</dt>
        <dd
          v-if="badge.logo"
          :class="$style.logo"
          :style="`background-image: url('${badge.logo}')`"
        />
        <dd v-else>
          —
        </dd>

        <dt>Badge Description</dt>
        <dd>{{ badge.description || '-' }}</dd>

        <dt>Badge Slug</dt>
        <dd>{{ badge.slug || '-' }}</dd>

        <dt>Provider Name</dt>
        <dd>{{ badge.provider || '-' }}</dd>

        <dt>Attained</dt>
        <dd>{{ badge.attained || 0 }}</dd>

        <dt>Last Updated</dt>
        <dd>{{ formatDate(badge.updatedAt) }}</dd>
      </data-list>
    </data-box>

    <badge-edit-modal
      v-if="modal.edit"
      :visible.sync="modal.edit"
      :badge="badge"
      @success="onEditSuccess"
    />
    <badge-archive-modal
      v-if="modal.archive"
      :id="badge.id"
      :visible.sync="modal.archive"
      @success="onArchiveSuccess"
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

.logo {
  height: 3rem;
  padding: 0;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  background-repeat: no-repeat;
  background-position: center left;
  background-size: contain;
}
</style>
