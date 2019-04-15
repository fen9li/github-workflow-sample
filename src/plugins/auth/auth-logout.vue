<template>
  <div class="auth-logout">
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
    this.$auth.logout()
  },
}
</script>
