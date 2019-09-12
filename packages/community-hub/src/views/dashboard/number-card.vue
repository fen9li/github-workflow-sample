<script>
export default {
  name: 'NumberCard',
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
}
</script>

<template>
  <el-card :class="$style.card">
    <div :class="$style.body">
      <div>
        <div :class="$style.number">
          {{ card.number }}
        </div>
        <span>
          {{ card.text }}
        </span>
      </div>
      <div :class="$style.imageWrapper">
        <img
          :src="card.img"
          :alt="card.text"
        >
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" module>
  .card {
    :global {
      .el-card__body {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
      }
    }
  }

  .body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: rem(14px);
  }

  .number {
    margin-bottom: 5px;
    font-size: rem(30px);
    line-height: rem(34px);
  }

  .imageWrapper {
    margin-left: 10px;

    img {
      width: 100%;
      max-width: 40px;
      max-height: 40px;
      object-fit: cover;
    }
  }
</style>
