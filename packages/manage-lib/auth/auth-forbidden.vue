<template>
  <div :class="$style.root">
    <div :class="$style.number">
      403
    </div>
    <div :class="$style.forbidden">
      Forbidden
    </div>
    <div :class="$style.description">
      <div>
        You don't have permissions to access this application
      </div>
      <span>Please contact Support</span>&nbsp;
      <a href="tel:1300134418">1300 134 418</a>&nbsp;or email
      <a href="mailto:support@ewallet.com.au">support@ewallet.com.au</a>
    </div>

    <div :class="$style.actions">
      <router-link :to="{ name: 'home' }">
        <el-button>Return to Home</el-button>
      </router-link>
      <router-link :to="{ name: 'logout' }">
        <el-button>Logout</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForbidden',
}
</script>

<style lang="scss" module>

.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 2rem 1rem 4rem;
  line-height: 1.6;
  text-align: center;

  a {
    display: inline;
  }
}

.number {
  font-size: 5rem;
  font-weight: 300;
  line-height: 1;
}

.forbidden {
  margin: 1rem 0 2rem;
  font-size: 2rem;
  font-weight: bold;
}

.description {
  margin-bottom: 2rem;
}

.actions {

  :global(.el-button) {
    margin: 0 .5rem;
  }
}

</style>
