<script>
import appConfig from '@src/app.config'
import MainLayout from '@layouts/main/main-layout'

export default {
  name: 'LogHistory',
  page: {
    title: 'Log History',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    MainLayout,
  },
}
</script>

<template>
  <main-layout title="Log History">
    Implement this
  </main-layout>
</template>
