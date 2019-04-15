<template>
  <div class="about">
    <h1>List of Applications</h1>
    <!-- <div>Logged as {{ $auth.profile.name }}</div> -->

    <div>
      <a href="/payments">Go to /payments</a>
    </div>

    <router-link to="/logout">
      <button>Logout</button>
    </router-link>
  </div>
</template>
