<template>
  <div class="auth-callback">
    <base-loader
      fullscreen
      theme="state"
      size="large"
    >
      <span>Authorizing ...</span>
    </base-loader>
  </div>
</template>

<script>
export default {
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
