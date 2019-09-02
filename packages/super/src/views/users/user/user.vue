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
      <el-dropdown trigger="click">
        <el-button
          :class="$style.button"
          size="small"
          type="primary"
          plain
        >
          <i
            class="el-icon-more"
            :class="$style.buttonIcon"
          />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            Edit User Details
          </el-dropdown-item>
          <el-dropdown-item>
            Resend Verification Email
          </el-dropdown-item>
          <el-dropdown-item>
            Resend SMS OTP Code
          </el-dropdown-item>
          <el-dropdown-item>
            Regenerate Google Auth Code
          </el-dropdown-item>
          <el-dropdown-item>
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
