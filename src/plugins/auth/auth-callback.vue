<template>
  <div class="auth-callback">
    <base-loader />
  </div>
</template>

<script>
export default {
  methods: {
    handleLoginEvent(data) {
      const target = data.state.target

      if (/logout/.test(target)) {
        this.$router.push('/')
      } else {
        this.$router.push(target || '/')
      }
    }
  },
  created() {
    this.$auth.handleAuthentication()
  }
}
</script>
