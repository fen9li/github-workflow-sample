<template>
  <div class="auth-logout">
    <base-loader
      fullscreen
      theme="state"
      size="large"
    >
      <span>Logout ...</span>
    </base-loader>
  </div>
</template>

<script>
export default {
  created() {
    this.$auth.logout()
  },
}
</script>
