<script>
export default {
  name: 'HomeOverviewNumbers',
  data() {
    return {
      selected: 'week',
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
  <el-card
    :class="$style.card"
  >
    <div
      slot="header"
      :class="$style.transactions"
    >
      <div :class="$style.imageWrapper">
        <img
          src="/img/home_transactions.png"
          alt="Dollar Icon"
          :class="$style.image"
        >
      </div>
      <div :class="$style.total">
        $ <span :class="$style.number">
          12,847
        </span>
      </div>
      <div :class="$style.description">
        Transactions processed this
        <el-dropdown
          trigger="click"
          class="home-dropdown"
        >
          <span class="home-dropdown_link">
            {{ selected }}
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in options"
              :key="index"
              @click.native="selected = item.value"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div :class="$style.total">
      $ <span :class="$style.number">
        36,899
      </span>
    </div>
    <div :class="$style.description">
      Last Settlement 12/04/2019 |
      <span
        :class="$style.link"
        @click="$router.push({name: 'payment-settlements'})"
      >
        View all <i :class="['el-icon-arrow-right', $style.icon]" />
      </span>
    </div>
  </el-card>
</template>

<style lang="scss" module>
.card {
  flex-basis: 25%;

  @include mq($until: sm) {
    flex-basis: 100%;
  }

  @include mq($from: sm, $until: xl) {
    flex-basis: calc(50% - 0.75rem);
  }

  :global {
    .el-card__header {
      font-size: 1rem;
      font-weight: 400;
      border-bottom: 1px solid var(--color-divider);
    }

    .el-card__body, .el-card__header {
      @include mq($until: md) {
        padding: 1.2rem;
      }
    }

    .el-card__body {
      @include mq($until: xl) {
        padding-top: 0;
      }
    }
  }
}

.imageWrapper {
  display: flex;
  justify-content: center;
}

.total {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  font-size: 1.7rem;
}

.number {
  padding-left: .7rem;
  font-size: 2.8rem;
  line-height: 2.4rem;

  @include mq($until: md) {
    padding-left: .5rem;
    font-size: 2.3rem;
  }
}

.description {
  padding: 1.5rem 0 2rem;
  text-align: center;

  @include mq($until: xl) {
    padding-bottom: 1rem;
  }
}

.link {
  display: inline-block;
  color: var(--color-primary);
  cursor: pointer;
}

.icon {
  margin-bottom: -0.2rem;
  font-weight: 700;
}
</style>
