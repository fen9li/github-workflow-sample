<script>
import formatDollar from '@lib/utils/format-dollar'

export default {
  name: 'HomeDashboardCards',
  data() {
    return {
      cards: [
        {
          currency: true,
          value: 2098,
          text: 'Last Settlement 12/12/2019',
          imageName: 'cash_icon',
        },
        {
          value: '1,278',
          text: 'Payments Recieved Today',
          imageName: 'payment_icon',
        },
        {
          value: '9,264',
          text: 'Active Customers',
          imageName: 'card_icon',
        },
        {
          value: '8,902',
          text: 'Active Subscriptions',
          imageName: 'list_icon',
        },
      ],
    }
  },
  methods: {
    formatDollar(value) {
      return formatDollar(value)
    },
    cardValue(card) {
      return card.currency ? formatDollar(card.value) : card.value
    },
  },
}
</script>

<template>
  <div class="home__dashboard__cards">
    <el-card
      v-for="(card, index) in cards"
      :key="index"
      class="home__dashboard__card"
    >
      <div class="home__dashboard__card__desc">
        <span class="home__dashboard__card__desc-value">
          {{ cardValue(card) }}
        </span>
        <span class="home__dashboard__card__desc-text">
          {{ card.text }}
        </span>
      </div>
      <div class="home__dashboard__card-img">
        <img
          :src="require(`~/assets/images/temp_mocks/${card.imageName}.png`)"
          alt="Card icon"
        >
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" src="./home.scss" />
