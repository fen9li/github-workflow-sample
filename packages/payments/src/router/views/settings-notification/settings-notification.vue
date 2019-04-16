<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'

export default {
  name: 'NotificationSettings',
  page: {
    title: 'Notification Settings',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
  },
  data() {
    return {
      form: {
        event: '7',
        renewal: true,
        cancelled: true,
        paymentSuccess: true,
        paymentFail: true,
        refund: true,
        expiring: true,
      },
    }
  },
}
</script>

<template>
  <main-layout title="Notification Settings">
    <el-card :class="[$style.body, 'card-no-padding']">
      <el-card class="card-inline">
        <span slot="header">
          Renewal reminder
        </span>
        <span :class="$style.event">
          Create an event for upcoming invoices
        </span>
        <el-select
          v-model="form.event"
          :class="$style.eventSelect"
        >
          <el-option
            label="3 Days"
            value="3"
          />
          <el-option
            label="5 Days"
            value="5"
          />
          <el-option
            label="7 Days"
            value="7"
          />
          <el-option
            label="14 Days"
            value="14"
          />
        </el-select>
        <span :class="$style.event">
          before a subscriptions renews.
        </span>
        <el-tooltip
          placement="bottom"
        >
          <span slot="content">
            Tooltip Content
          </span>
          <i class="el-icon-warning text-primary" />
        </el-tooltip>
      </el-card>

      <el-card :class="[$style.customers, 'card-inline']">
        <span slot="header">
          Email customers about
        </span>
        <el-form>
          <el-form-item>
            <el-checkbox v-model="form.renewal">
              <span>Upcoming renewal / non renewal reminders</span>
              <span :class="$style.description">
                An email will be sent 7 days before their subscriptions renews
                or to advise non renewal.
              </span>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="form.cancelled">
              <span>Cancelled Subscriptions</span>
              <span :class="$style.description">
                An email will be sent when subsription is canselled.
              </span>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="form.paymentSuccess">
              <span>Successful Payment</span>
              <span :class="$style.description">
                An email will be sent each time a payment attempt succeeds,
                including retries.
              </span>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="form.paymentFail">
              <span>Failed Payment</span>
              <span :class="$style.description">
                An email will be sent each time a payment attempt fail,
                including retries.
              </span>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="form.refund">
              <span>Refunds</span>
              <span :class="$style.description">
                An email will be sent when refund is processed.
              </span>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="form.expiring">
              <span>Expiring cards </span>
              <span :class="$style.description">
                An email will be sent 1 month before their card on file expires.
              </span>
            </el-checkbox>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </main-layout>
</template>

<style lang="scss" module>
@import '@design';

.eventSelect {
  padding: 0 1rem;
}

.customers {
  :global(.el-checkbox__label) {
    display: flex;
    flex-direction: column;
  }
}

.description {
  margin-top: 0.4rem;
  color: $color-text-light;
  white-space: normal;
}

</style>
