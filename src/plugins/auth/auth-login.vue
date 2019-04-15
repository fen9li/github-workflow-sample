<template>
  <div :class="$style.root">
    <base-loader />
  </div>
</template>

<script>
import BaseLoader from '../../components/base/loader'

export default {
  components: {
    BaseLoader,
  },
  props: {
    from: {
      type: String,
      default: '/',
    },
  },
  created() {
    this.$auth.renewTokens()
      .then(() => {
        console.log('sds', this.from)
        this.$router.replace(this.from)
      })
      .catch(() => {
        this.$auth.login()
      })
  },
}
</script>

<style lang="scss" module>
.root {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
}
</style>
