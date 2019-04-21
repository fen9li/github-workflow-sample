<script>
import Chart from './chart'

const mockPayments = [
  {
    'date': '2018-08-01',
    'payments': 800,
  },
  {
    'date': '2018-09-01',
    'payments': 1000,
  },
  {
    'date': '2018-10-01',
    'payments': 1300,
  },
  {
    'date': '2018-11-01',
    'payments': 1100,
  },
  {
    'date': '2018-12-01',
    'payments': 1700,
  },
  {
    'date': '2019-01-01',
    'payments': 1200,
  },
  {
    'date': '2019-02-01',
    'payments': 500,
  },
  {
    'date': '2019-03-01',
    'payments': 1800,
  },
]

const mockCustomers = [
  {
    'date': '2018-08-01',
    'customers': 800,
    'subscriptions': 1100,
  },
  {
    'date': '2018-09-01',
    'customers': 1000,
    'subscriptions': 400,
  },
  {
    'date': '2018-10-01',
    'customers': 1300,
    'subscriptions': 500,
  },
  {
    'date': '2018-11-01',
    'customers': 1100,
    'subscriptions': 1700,
  },
  {
    'date': '2018-12-01',
    'customers': 1700,
    'subscriptions': 400,
  },
  {
    'date': '2019-01-01',
    'customers': 200,
    'subscriptions': 600,
  },
  {
    'date': '2019-02-01',
    'customers': 1800,
    'subscriptions': 1800,
  },
  {
    'date': '2019-03-01',
    'customers': 1700,
    'subscriptions': 400,
  },
]

export default {
  name: 'HomeDashboardGraphs',
  components: { Chart },
  data() {
    return {
      checkList: ['Successfull', 'Pending'],
      options: [
        { label: 'Yesterday', value: 'Yesterday' },
        { label: 'Last month', value: 'Last month' },
      ],
      currentSorting: 'Last Month',
    }
  },
  computed: {
    payments() {
      return mockPayments
    },
    customers() {
      return mockCustomers
    },
  },
}
</script>

<template>
  <div class="home__dashboard__graphs">
    <el-card
      class="home__dashboard__graph"
    >
      <div class="home__dashboard__graph-header">
        <span class="home__dashboard__graph-title">
          Payments Overview
        </span>
        <!-- Temporary commented while design is being changed -->
        <!-- <div class="home__dashboard__graph-controls">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="Successfull" />
            <el-checkbox label="Pending" />
            <el-checkbox label="Failed" />
          </el-checkbox-group>

          <el-select
            v-model="currentSorting"
            :placeholder="currentSorting"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div> -->
        <div class="home__dashboard__graph-header__labels">
          <div class="home__dashboard__graph-header__label">
            <div
              class="home__dashboard__graph-header__label-dot"
              style="background-color:#D099ED"
            />
            <span class="home__dashboard__graph-header__label-text">
              Payments
            </span>
          </div>
        </div>
      </div>
      <div class="home__dashboard__graph-body">
        <div class="home__dashboard__graph-image">
          <chart :data="payments" />
          <!-- <img
            src="@assets/images/temp_mocks/payments_recieved.png"
            alt="Payments Overview"
          > -->
        </div>
      </div>
    </el-card>

    <el-card
      class="home__dashboard__graph"
    >
      <div class="home__dashboard__graph-header">
        <span class="home__dashboard__graph-title">
          Customers & Subscriptions
        </span>
        <div class="home__dashboard__graph-header__labels">
          <div class="home__dashboard__graph-header__label">
            <div
              class="home__dashboard__graph-header__label-dot"
              style="background-color:#4C91F8"
            />
            <span class="home__dashboard__graph-header__label-text">
              Customers
            </span>
          </div>
          <div class="home__dashboard__graph-header__label">
            <div
              class="home__dashboard__graph-header__label-dot"
              style="background-color:#D099ED"
            />
            <span class="home__dashboard__graph-header__label-text">
              Subscriptions
            </span>
          </div>
        </div>
      </div>
      <div class="home__dashboard__graph-body">
        <div class="home__dashboard__graph-image">
          <chart :data="customers" />
          <!-- <img
            src="@assets/images/temp_mocks/customers_subscriptions.png"
            alt=""
          > -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" src="./home.scss" />
