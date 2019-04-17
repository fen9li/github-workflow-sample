<template>
  <div class="auth-callback">
    <base-loader />
  </div>
</template>

<script>
import BaseLoader from '../../components/base/loader'

export default {
  components: {
    BaseLoader,
  },
  created() {
    this.$auth.handleAuthentication()
  },
  methods: {
    handleLoginEvent(data) {
      const target = data.state.target

      if (/logout/.test(target)) {
        this.$router.push('/')
      } else {
        this.$router.push(target || '/')
      }
    },
  },
}
</script>
