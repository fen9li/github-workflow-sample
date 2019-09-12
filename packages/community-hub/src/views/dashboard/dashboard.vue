<script>
import userData from '@tests/__fixtures__/user'
import dashboardData from '@tests/__fixtures__/dashboard'
import table from './top-clicked-offers.table'
import NumberCard from './number-card'
import ChartLine from './charts/chart-line'
import ChartPie from './charts/chart-pie'
import { formatDate } from '@lib/utils/format-date'

export default {
  name: 'Dashboard',
  page: {
    title: 'Dashboard',
  },
  components: {
    ChartLine,
    ChartPie,
    NumberCard
  },
  data() {
    return {
      user: userData,
      dashboard: dashboardData,
      table: table(this),
      numberCards: [
        {
          number: '1,080',
          text: 'Clicks as of 21.07.2019',
          img: '/dashboard/clicks.png'
        },
        {
          number: '29',
          text: 'Offers',
          img: '/dashboard/offers.png'
        }
      ],
      periods: [
        { value: 'month', label: 'Last Month' },
        { value: 'week', label: 'Last Week' },
        { value: 'year', label: 'Last Year' },
      ],

      clicksByTypePeriod: { value: 'month', label: 'Last Month' },
      clicksPerDayPeriod: { value: 'week', label: 'Last Week' },
    }
  },
  computed: {
    formatLabels() {
      return this.dashboard.clicksPerDayLabels.map(i => {
        return formatDate(i, 'DD/MM')
      })
    }
  },
  methods: {
    randomInteger(min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1))
    },
    changeClicksByType(period) {
      if (this.clicksByTypePeriod === period) return

      this.clicksByTypePeriod = period

      let percent = 100
      this.dashboard.clicksByType = this.dashboard.clicksByType.map((d, idx, arr) => {
        d.data = idx !== arr.length - 1
          ? this.randomInteger(1, percent)
          : percent
        percent -= d.data
        return d
      }, 100)
    },
    changeClicksPerDay(period) {
      if (this.clicksPerDayPeriod === period) return

      this.clicksPerDayPeriod = period

      this.dashboard.clicksPerDay = this.dashboard.clicksPerDay.map(d => {
        d.data = d.data.map(() => this.randomInteger(500, 2000))
        return d
      })
    },
  },
}
</script>

<template>
  <main-layout :title="`Welcome ${user.fullName}`">
    <template #header>
      <el-button
        type="primary"
        @click="$router.push({
          name: 'retailer-new'
        })"
      >
        + Add New Retailer
      </el-button>
    </template>
    <div :class="$style.dashboard">
      <el-row :gutter="30">
        <el-col
          :xs="24"
          :md="12"
        >
          <el-row>
            <el-card>
              <div
                slot="header"
                :class="$style.cardHeader"
              >
                Clicks by Offer Type
                <el-dropdown
                  trigger="click"
                  :class="$style.cardDropdown"
                >
                  <span>
                    {{ clicksByTypePeriod.label }}
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(period, index) in periods"
                      :key="index"
                      @click.native="changeClicksByType(period)"
                    >
                      {{ period.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <chart-pie
                :datasets="dashboard.clicksByType"
                :label-template="(i) => `${i.data}% ${i.label}`"
                :height="300"
              />
            </el-card>
          </el-row>
          <el-row>
            <el-card>
              <div
                slot="header"
                :class="$style.cardHeader"
              >
                Clicks per Day
                <el-dropdown
                  trigger="click"
                  :class="$style.cardDropdown"
                >
                  <span>
                    {{ clicksPerDayPeriod.label }}
                    <i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(period, index) in periods"
                      :key="index"
                      @click.native="changeClicksPerDay(period)"
                    >
                      {{ period.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <chart-line
                :datasets="dashboard.clicksPerDay"
                :labels="formatLabels"
                :height="250"
              />
            </el-card>
          </el-row>
        </el-col>
        <el-col
          :xs="24"
          :md="12"
        >
          <el-row :gutter="30">
            <el-col
              v-for="card in numberCards"
              :key="card.text"
              :xs="24"
              :md="12"
            >
              <number-card :card="card" />
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-card body-style="padding-top: 0; padding-bottom: 0">
                <div slot="header">
                  Top 10 Offers Clicked
                </div>
                <table-layout
                  :table-name="table.name"
                  :processor="table.processor"
                  :columns="table.columns"
                  :table-controls="false"
                  :class="$style.offersTable"
                  shadow="never"
                />
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </main-layout>
</template>

<style lang="scss" module>
  .dashboard {
    :global {
      .el-row {
        margin-bottom: 30px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .el-card__header {
        font-weight: 400;
      }
    }
  }

  .cardHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cardDropdown {
    color: var(--color-text-light);
    cursor: pointer;
  }

  .offersTable {
    border: none !important;

    :global {
      .el-card__body, .el-card__body > div {
        padding: 0;
      }
    }
  }
</style>
