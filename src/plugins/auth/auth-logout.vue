<template>
  <div class="auth-logout">
    <base-loader />
  </div>
</template>

<script>
export default {
  created() {
    this.$auth.logOut()
  }
}
</script>
