<script>
import BuilderMixin from '~/widgets/builder-record.mixin'

export default {
  name: 'ImagesBuilderItem',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
  }),
}
</script>

<template>
  <div class="images-builder-item">
    <builder-image v-model="form.image" />
    <builder-cta v-model="form.cta" />
  </div>
</template>
