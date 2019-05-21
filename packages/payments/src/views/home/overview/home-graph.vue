<script>
export default {
  name: 'HomeOverviewGraph',
  data() {
    return {
      selectedGraph: 'customers',
      selectedPeriod: 'year',
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
      <div :class="$style.title">
        Overview for the
        <el-dropdown
          trigger="click"
          class="home-dropdown"
        >
          <span class="home-dropdown_link">
            {{ selectedPeriod }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in options"
              :key="index"
              @click.native="selectedPeriod = item.value"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div :class="$style.imageWrapper">
        <img
          src="/img/home_graph.png"
          alt="Graph"
          :class="$style.image"
        >
      </div>
      <div :class="$style.radio">
        <el-radio-group v-model="selectedGraph">
          <el-radio label="customers">
            Customers & Subscriptions
          </el-radio>
          <el-radio label="transactions">
            Transactions & Settlements
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" module>
.card {
  flex-basis: 50%;
  margin-top: 1.5rem;

  @include mq($until: sm) {
    flex-basis: 100%;
  }

  @include mq($from: sm, $until: xl) {
    flex-basis: 100%;
  }

  @include mq($from : xl) {
    margin: 0 1.5rem;
  }
}

.title {
  font-size: 1.4rem;

  :global {
    .home-dropdown_link {
      font-size: 1.4rem;
    }
  }
}

.imageWrapper {
  padding: 2rem 0;
}

.image {
  width: 100%;
  margin: 0 auto;
}

.radio {
  :global {
    .el-radio__label {
      font-size: 1rem;
    }

    .el-radio {
      @include mq($until: xxl) {
        margin: 0.5rem;
      }
    }
  }
}
</style>
