<script>
export default {
  name: 'HomeOverviewCustomers',
  data() {
    return {
      selectedSub: 'week',
      selectedCust: 'week',
      options: [
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' },
        { value: 'week', label: 'week' },
      ],
    }
  },
}
</script>

<template>
  <el-card :class="$style.card">
    <div :class="$style.wrapper">
      <span :class="$style.title">Customers & Subscrptions</span>
      <div :class="$style.imageWrapper">
        <img
          src="/img/home_customers.png"
          alt="Customers"
        >
      </div>
      <div :class="$style.description">
        <span :class="$style.count">
          42
        </span>
        <span :class="$style.text">
          Subscriptions linked to customers this
          <el-dropdown
            trigger="click"
            class="home-dropdown"
          >
            <span class="home-dropdown_link">
              {{ selectedSub }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in options"
                :key="index"
                @click.native="selectedSub = item.value"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
      <div :class="$style.description">
        <span :class="[$style.count, $style.purple]">
          187
        </span>
        <span :class="$style.text">
          New customers added this
          <el-dropdown
            trigger="click"
            class="home-dropdown"
          >
            <span class="home-dropdown_link">
              {{ selectedCust }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in options"
                :key="index"
                @click.native="selectedCust = item.value"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
      <el-button
        type="primary"
        :class="$style.button"
        @click="$router.push({name: 'customers'})"
      >
        View Customers
      </el-button>
    </div>
  </el-card>
</template>

<style lang="scss" module>
.card {
  flex-basis: 25%;

  @include mq($until: sm) {
    flex-basis: 100%;
    margin-top: 1.5rem;
  }

  @include mq($from: sm, $until: xl) {
    flex-basis: calc(50% - 0.75rem);
  }

  :global {
    .el-card__body {
      @include mq($until: md) {
        padding: 1.2rem;
      }
    }
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
}

.title {
  font-size: 1.4rem;

  @include mq($until: md) {
    text-align: center;
  }
}

.imageWrapper {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}

.description {
  display: flex;
  align-items: center;
  padding-top: 2rem;
}

.count {
  min-width: 3rem;
  margin-right: 2rem;
  font-size: 2rem;
  color: var(--color-primary);

  @include mq($until: md) {
    margin-right: 1rem;
  }
}

.purple {
  color: var(--color-purple);
}

.button {
  margin-top: 2rem;
}
</style>
