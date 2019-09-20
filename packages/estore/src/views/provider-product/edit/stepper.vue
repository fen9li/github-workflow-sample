<script>
export default {
  name: "Stepper",
  computed: {
    step() {
      return this.$route.name
    },
  },
}
</script>

<template>
  <ul :class="$style.stepper">
    <li :class="[$style.step, $style.stepCompleted]">
      <div :class="$style.block" />
      <div :class="$style.text">
        Product
      </div>
    </li>
    <li
      :class="[
        $style.step,
        step !== 'provider-product-edit-product' && $style.stepCompleted
      ]"
    >
      <div :class="$style.block" />
      <div :class="$style.text">
        Price
      </div>
    </li>
    <li
      :class="[
        $style.step,
        (step === 'provider-product-edit-dimensions' || step === 'provider-product-edit-shipping') && $style.stepCompleted
      ]"
    >
      <div :class="$style.block" />
      <div :class="$style.text">
        Dimensions
      </div>
    </li>
    <li
      :class="[
        $style.step,
        (step === 'provider-product-edit-shipping') && $style.stepCompleted
      ]"
    >
      <div :class="$style.block" />
      <div :class="$style.text">
        Shipping
      </div>
    </li>
  </ul>
</template>

<style lang="scss" module>
.stepper {
  display: flex;
  padding: 0;
  margin: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    padding-right: rem(12px);
  }
}

.block {
  width: 100px;
  height: rem(12px);
  margin-bottom: rem(12px);
  border: 1px solid var(--color-dark-gray);
}

.text {
  font-size: rem(12px);
  color: var(--color-dark-gray);
}

.stepCompleted {
  .block {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
  .text {
    color: var(--color-primary);
  }
}
</style>
