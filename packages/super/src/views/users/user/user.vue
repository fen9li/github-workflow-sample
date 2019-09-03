<script>
import { formatDate } from '@lib/utils/format-date'

import user from './user.mock.js'

export default {
  name: 'User',
  page: {
    title: 'User',
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userData: {
      },
    }
  },
  computed: {
    status() {
      return 'pending'
    },
    iconName() {
      switch (this.userData.status) {
        case 'active':
          return 'check'
        case 'pending':
          return 'time'
        default:
          return 'close'
      }
    },
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.userData = user
    },
    formatDate(value, format) {
      return formatDate(value, format || 'DD/MM/YYYY')
    },
    handleCommand(command) {
      switch (command) {
        case 'edit':
          this.onEditClick()
          break
        case 'resend-email':
          break
        case 'resend-sms':
          break
        case 'resend-google':
          break
        case 'change-password':
          break
      }
    },
    onEditClick() {
      this.$router.push({
        name: 'user-edit',
        params: {
          id: this.userData.id,
          user: this.userData,
        },
      })
    },
  },
}
</script>

<template>
  <main-layout
    :title="userData.fullName"
    :subtitle="`User ID ${userData.id}`"
    back
  >
    <div
      slot="header"
      :class="$style.caption"
    >
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <el-button
          :class="$style.button"
          size="small"
        >
          <i
            class="el-icon-more"
            :class="$style.buttonIcon"
          />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">
            Edit User Details
          </el-dropdown-item>
          <el-dropdown-item command="resend-email">
            Resend Verification Email
          </el-dropdown-item>
          <el-dropdown-item command="resend-sms">
            Resend SMS OTP Code
          </el-dropdown-item>
          <el-dropdown-item command="resend-google">
            Regenerate Google Auth Code
          </el-dropdown-item>
          <el-dropdown-item command="change-password">
            Change Password
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-card>
      <div class="info-block__wrapper">
        <div class="info-block">
          <span
            class="info-block__title"
            :class="$style.header"
          >
            <div :class="$style.headerTitle">
              User Details
            </div>
            <div
              :class="{
                [$style.headerStatus] : true,
                [$style.headerStatusActive]: userData.status === 'active',
                [$style.headerStatusPending]: userData.status === 'pending',
                [$style.headerStatusBlocked]: userData.status === 'blocked',
              }"
            >
              <el-icon :name="iconName" />
              Status
            </div>
          </span>
          <dl
            v-if="userData"
            class="datalist"
          >
            <dt>Date Created</dt>
            <dd>{{ formatDate(userData.created_at) }}</dd>

            <dt>Last Upadate Date</dt>
            <dd>{{ formatDate(userData.created_at) }}</dd>

            <dt>Last Login Date</dt>
            <dd>{{ formatDate(userData.created_at) }}</dd>

            <dt>User ID</dt>
            <dd>{{ userData.id }}</dd>

            <dt>First Name</dt>
            <dd>{{ userData.givenName }}</dd>

            <dt>Last Name</dt>
            <dd>{{ userData.familyName }}</dd>

            <dt>Email</dt>
            <dd>{{ userData.email }}</dd>

            <dt>Telephone</dt>
            <dd>{{ userData.phone }}</dd>

            <dt>Provider</dt>
            <dd>{{ userData.providerId }}</dd>

            <dt>2FA</dt>
            <dd>{{ userData.twoFA }}</dd>
          </dl>

          <span
            v-else
            class="info-block__empty"
          >
            No information provided
          </span>
        </div>
      </div>

      <hr :class="['divider-primary', 'info-block__divider']">

      <div class="info-block__wrapper">
        <div class="info-block">
          <span class="info-block__title">Products</span>

          <div>Products List Placeholder</div>
        </div>
      </div>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
.button {
  height: 2rem;

  :global {
    .el-icon--right {
      margin-left: 0.6rem;
    }
  }
}

.buttonIcon {
  transform: rotate(90deg);
}

.header {
  display: flex;
  align-items: center;
}

.headerTitle {
  margin-right: rem(64px);
}

.headerStatus {
  font-size: rem(14px);
  font-weight: normal;
}

.headerStatusActive {
  color: #29d737;
}

.headerStatusPending {
  color: #fbb241;
}

.headerStatusBlocked {
  color: #fc1e1e;
}


</style>
