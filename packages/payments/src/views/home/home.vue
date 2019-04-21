<script>
import HomeGraphs from './home-graphs'
import HomeCards from './home-cards'
import HomeTables from './home-tables'

export default {
  name: 'Home',
  components: {
    HomeCards,
    HomeTables,
    HomeGraphs,
  },
}
</script>

<template>
  <main-layout
    title="Welcome Friend"
    class="home__dashboard"
  >
    <home-graphs />
    <home-cards />
    <home-tables />
  </main-layout>
</template>

<style lang="scss" src="./home.scss" />
