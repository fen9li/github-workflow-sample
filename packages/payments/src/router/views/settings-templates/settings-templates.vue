<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout.vue'

export default {
  name: 'Templates',
  page: {
    title: 'Templates',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
  },
}
</script>

<template>
  <main-layout title="Templates">
    Implement this
  </main-layout>
</template>
