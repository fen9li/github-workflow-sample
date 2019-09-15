<script>
import BuilderElement from './builder-element.mixin'

export default {
  name: 'BuilderWrapper',
  mixins: [BuilderElement],
  data: () => ({
    form: {
      reverse: false,
      space: false,
      row: {
        xs: 1,
        sm: 2,
        md: 3,
      },
    }
  }),
}
</script>

<template>
  <div class="builder-wrapper form-element">
    <div
      v-if="shown('row')"
      class="form-element"
    >
      <div class="block-label">
        Items per row
      </div>
      <div class="builder-wrapper__controls">
        <div class="builder-wrapper__control">
          <div class="input-label">
            Mobile
          </div>
          <builder-select
            v-model="form.row.xs"
            :options="[
              { value: 1 },
              { value: 2 },
              { value: 3 },
            ]"
          />
        </div>
        <div class="builder-wrapper__control">
          <div class="input-label">
            Tablet
          </div>
          <builder-select
            v-model="form.row.sm"
            :options="[
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
            ]"
          />
        </div>
        <div class="builder-wrapper__control">
          <div class="input-label">
            Desktop
          </div>
          <builder-select
            v-model="form.row.md"
            :options="[
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
              { value: 6 },
            ]"
          />
        </div>
      </div>
    </div>
    <builder-radio
      v-if="shown('space')"
      v-model="form.space"
      label="Space between items"
      type="boolean"
    />
    <builder-radio
      v-if="shown('reverse')"
      v-model="form.reverse"
      label="Reverse items"
      type="boolean"
    />
  </div>
</template>

<style lang="scss">
.builder-wrapper {

  &__controls {
    display: flex;
  }

  &__control + &__control {
    margin-left: rem(12px);
  }
}
</style>
