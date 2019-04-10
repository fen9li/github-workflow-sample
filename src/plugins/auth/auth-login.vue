<template>
  <div class="auth-login">
    <base-loader />
  </div>
</template>

<script>
export default {
  props: {
    from: {
      type: String,
      default: '/',
    },
  },
  created() {
    this.$auth.renewTokens()
      .then(() => {
        console.log(this.from)
        this.$router.replace(this.from)
      })
      .catch(() => {
        this.$auth.login()
      })
  }
}
</script>
