<script>
export default {
  data: function() {
    return {
      blockingUsers: true,
      unblockingUsers: true,
      stolenCredentials: true,
      plannedOutages: true,
      unplannedOutages: true,

      userRegistered: true,

      retryAmount: 1,
      retryInterval: 1,

      googleAuth: true,
      smsOTP: true,
    }
  }
}
</script>

<template>
  <el-card shadow="always">
    <el-row>
      <el-col :span="9">
        <div :class="$style['block']">
          <h3 :class="$style['settings-title']">
            Email Users about:
          </h3>
          <div :class="$style['row']">
            User Registration (always enabled)
          </div>
          <div :class="$style['row']">
            Password Reset (always enabled)
          </div>
          <el-checkbox
            v-model="blockingUsers"
            :class="$style['row']"
          >
            Blocking Users
          </el-checkbox>
          <el-checkbox
            v-model="unblockingUsers"
            :class="$style['row']"
          >
            Unblocking Users
          </el-checkbox>
          <el-checkbox
            v-model="stolenCredentials"
            :class="$style['row']"
          >
            Stolen Credentials
          </el-checkbox>
          <el-checkbox
            v-model="plannedOutages"
            :class="$style['row']"
          >
            Planned System Outages
          </el-checkbox>
          <el-checkbox
            v-model="unplannedOutages"
            :class="$style['row']"
          >
            Unplanned System Outages
          </el-checkbox>
        </div>

        <div :class="$style['block']">
          <h3 :class="$style['settings-title']">
            Email myself about:
          </h3>
          <el-checkbox
            v-model="userRegistered"
            :class="$style['row']"
          >
            User Registered Successfully
          </el-checkbox>
        </div>
      </el-col>
      <el-col :span="9">
        <div :class="$style['block']">
          <h3 :class="$style['settings-title']">
            Configure Failed Notification Retries
          </h3>
          <div :class="[$style['row'], $style['justify-content']]">
            <div>Retry Interval</div>
            <el-select
              v-model="retryInterval"
              placeholder="Select"
            >
              <el-option
                v-for="item in [{label: 'Minutes (default)', value: 1}]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div
            :class="[$style['row'], $style['justify-content']]"
            :style="{ 'margin-top': '16px' }"
          >
            <div>Amount of Retries</div>
            <el-select
              v-model="retryAmount"
              placeholder="Select"
            >
              <el-option
                v-for="item in [{label: '5 (default)', value: 1}]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>

        <div :class="$style['block']">
          <h3 :class="$style['settings-title']">
            Configure 2FA Channel
          </h3>
          <el-checkbox
            v-model="smsOTP"
            :class="$style['row']"
          >
            SMS OTP
          </el-checkbox>
          <el-checkbox
            v-model="googleAuth"
            :class="$style['row']"
          >
            Google Authenticator
          </el-checkbox>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" module>
  :global {
    .el-card {
      margin-top: 2rem;
    }
    .el-card__body:first-child {
      padding-top: 2rem;
    }
    .el-checkbox .el-checkbox__label {
      padding-left: 1rem;
    }
  }

  .block {
    margin-bottom: 2rem;
  }

  .row {
    display: flex;
    align-items: center;
    height: 40px;
  }

  .justify-content {
    justify-content: space-between;
  }

  .settings-title {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
</style>

