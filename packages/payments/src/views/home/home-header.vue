<script>
import vPos from '../transactions/transactions-virtual-pos'

export default {
  name: 'HomeHeader',
  components: {
    vPos,
  },
  data() {
    return {
      modal: {
        pos: false,
      },
    }
  },
}
</script>

<template>
  <div :class="$style.wrapper">
    <el-card :class="$style.card">
      <div :class="$style.imageWrapper">
        <img
          src="/img/home_welcome.png"
          alt="Welcome"
          :class="$style.image"
        >
      </div>
      <span :class="$style.title">
        Welcome to <b>Payment Gateway</b>
      </span>
    </el-card>
    <el-card :class="$style.card">
      <span :class="$style.posText">
        Charge any existing Credit/Debit Card
        through Virtual POS
      </span>
      <el-button
        type="primary"
        :class="$style.pos"
        @click="modal.pos = true"
      >
        Virtual POS
      </el-button>
      <!-- <el-button
        type="primary"
        @click="modal.pos = true"
      >
        Virtual POS
      </el-button> -->
      <v-pos
        v-if="modal.pos"
        :visible.sync="modal.pos"
      />
    </el-card>
  </div>
</template>

<style lang="scss" module>
.wrapper {
  display: flex;

  @include mq($until: lg) {
    flex-direction: column;
  }
}

.card {
  flex-basis: 50%;

  &:nth-child(1) {
    margin-bottom: 1.5rem;

    @include mq($from: lg) {
      margin-right: 1.5rem;
      margin-bottom: 0;
    }
  }

  :global{
    .el-card__body {
      display: flex;
      align-items: center;
      height: 100%;
      padding-top: 1.2rem !important;
      padding-bottom: 1.2rem !important;

      @include mq($until: sm) {
        flex-direction: column;
        padding: 1.2rem;
        text-align: center;
      }
    }
  }
}

.imageWrapper {
  margin-right: 2rem;
}

.title {
  font-size: 1.8rem;
  text-align: center;

  @include mq($until: sm) {
    font-size: 1.4rem;
  }
}

.posText {
  padding-right: 1rem;
  font-size: 1.1rem;

  @include mq($from: xxl) {
    max-width: 50%;
  }
}

.pos {
  width: 15rem;
  margin-left: auto;

  @include mq($until: sm) {
    margin: 1rem 0;
  }
}
</style>
