<script>
import { formatDate } from '@lib/utils/format-date'
import { mapActions } from 'vuex'

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
      user: {
      },
      loading: false,
    }
  },
  computed: {
    status() {
      return 'pending'
    },
    iconName() {
      switch (this.user.status) {
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
    ...mapActions('user', ['getUser']),
    async getData() {
      this.loading = true
      const [, response] = await this.getUser(this.id)
      if (response) {
        this.user = { ...response }
      }
      this.loading = false
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
          id: this.user.id,
          user: this.user,
        },
      })
    },
  },
}
</script>

<template>
  <main-layout
    :title="user.fullName"
    :loading="loading"
    :subtitle="`User ID ${user.id}`"
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
      <div
        class="info-block__wrapper"
      >
        <div class="info-block">
          <span
            class="info-block__title"
            :class="$style.header"
          >
            <div :class="$style.headerTitle">
              User Details
            </div>
            <div
              v-if="user.status"
              :class="{
                [$style.headerStatus] : true,
                [$style.headerStatusActive]: user.status === 'active',
                [$style.headerStatusPending]: user.status === 'pending',
                [$style.headerStatusBlocked]: user.status === 'blocked',
              }"
            >
              <el-icon :name="iconName" />
              {{ user.status }}
            </div>
          </span>
          <dl
            v-if="user"
            class="datalist"
          >
            <dt>Date Created</dt>
            <dd>{{ formatDate(user.created_at) }}</dd>

            <dt>Last Upadate Date</dt>
            <dd>{{ formatDate(user.created_at) }}</dd>

            <dt>Last Login Date</dt>
            <dd>{{ formatDate(user.created_at) }}</dd>

            <dt>User ID</dt>
            <dd>{{ user.id }}</dd>

            <dt>First Name</dt>
            <dd>{{ user.givenName }}</dd>

            <dt>Last Name</dt>
            <dd>{{ user.familyName }}</dd>

            <dt>Email</dt>
            <dd>{{ user.email }}</dd>

            <dt>Telephone</dt>
            <dd>{{ user.phone }}</dd>

            <dt>Provider</dt>
            <dd>{{ user.providerId }}</dd>

            <dt>2FA</dt>
            <dd>{{ user.twoFA }}</dd>
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
