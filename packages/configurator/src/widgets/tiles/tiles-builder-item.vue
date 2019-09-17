<script>
import BuilderMixin from '~/widgets/builder-record.mixin'

export default {
  name: 'TilesItemBuilder',
  mixins: [BuilderMixin],
  data: () => ({
    form: null,
  }),
}
</script>

<template>
  <div class="tiles-item-builder">
    <builder-content
      v-model="form.content"
      exclude="size"
      :limits="{ title: 250, text: 350 }"
    />
    <builder-image
      v-model="form.image"
      :ratio="{
        mobile: '321:200',
        desktop: '365:228',
      }"
    />
    <builder-cta
      v-model="form.cta"
      label="Link"
      :limit="40"
    />
  </div>
</template>
