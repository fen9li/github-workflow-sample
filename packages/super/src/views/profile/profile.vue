<script>
import { formatDate } from '@lib/utils/format-date'
import { mapGetters } from 'vuex'
import ProfileEditModal from './profile-edit-modal'
import PasswordChangeModal from './password-change-modal'

export default {
  name: 'Profile',
  components: {
    ProfileEditModal,
    PasswordChangeModal,
  },
  page: {
    title: 'Profile',
  },
  data() {
    return {
      showEditModal: false,
      showPasswordChangeModal: false,
    }
  },
  computed: {
    ...mapGetters('auth', [
      'profile',
    ]),
  },
  methods: {
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY HH:mm')
    },
  },
}
</script>

<template>
  <main-layout
    :title="profile.name"
    :subtitle="`User ID ${ profile.id }`"
  >
    <el-card>
      <div
        slot="header"
        :class="$style.header"
      >
        <div :class="$style.title">
          Profile Details
        </div>
        <div :class="$style.headerButtons">
          <el-button
            type="primary"
            :class="$style.headerButton"
            @click="showEditModal = true"
          >
            Edit Profile Details
          </el-button>
          <el-button
            type="primary"
            plain
            :class="$style.headerButton"
            @click="showPasswordChangeModal = true"
          >
            Change Password
          </el-button>
        </div>
      </div>
      <dl class="datalist">
        <dt>Date Created</dt>
        <dd>{{ formatDate(profile.created_at) }}</dd>

        <dt>Last Upadate Date</dt>
        <dd>{{ formatDate(profile.updated_at) }}</dd>

        <dt>Last Login Date</dt>
        <dd>{{ formatDate(profile.logged_at) }}</dd>

        <dt>User ID</dt>
        <dd>{{ profile.id || '-' }}</dd>

        <dt>First Name</dt>
        <dd>{{ profile.givenName || '-' }}</dd>

        <dt>Last Name</dt>
        <dd>{{ profile.familyName || '-' }}</dd>

        <dt>Email Address</dt>
        <dd>{{ profile.email || '-' }}</dd>

        <dt>Telephone</dt>
        <dd>{{ profile.phone || '-' }}</dd>

        <dt>Role</dt>
        <dd>{{ profile.role || '-' }}</dd>

        <dt>Provider</dt>
        <dd>{{ profile.providerId || '-' }}</dd>
      </dl>
    </el-card>
    <profile-edit-modal
      :visible.sync="showEditModal"
      modal-append-to-body
      append-to-body
      :profile="profile"
      @success="showEditModal = false"
    />
    <password-change-modal
      :visible.sync="showPasswordChangeModal"
      modal-append-to-body
      append-to-body
      @success="showPasswordChangeModal = false"
    />
  </main-layout>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
}

.title {
  display: flex;
  flex: 1 0 50%;
  align-items: center;
}

.headerButtons {
  display: flex;
  flex-direction: column;
  margin: rem(-8px);
  margin-bottom: rem(-64px)
}

.headerButton {
  margin: rem(8px) !important;
}

.infoBlock {
  width: 100%;
}
</style>
