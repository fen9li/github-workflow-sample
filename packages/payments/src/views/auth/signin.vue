<script>
import { authMethods } from '~/state/helpers'

export default {
  name: 'Signin',
  data() {
    return {
      form: {
        username: '',
        password: '',
        remember: true,
      },
      authError: null,
      tryingToLogIn: false,
      checked: true,
    }
  },
  methods: {
    ...authMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      return this.logIn({
        username: this.form.username,
        password: this.form.password,
      })
        .then(token => {
          this.tryingToLogIn = false

          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        })
        .catch(error => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },
  },
}
</script>

<template>
  <div class="signin">
    <el-form
      ref="form"
      class="signin__form"
      :model="form"
      label-width="100px"
      @submit.prevent="tryToLogIn"
    >
      <div class="signin__logo">
        <img
          src="/img/logo.jpg"
          alt="Logo EONX"
        >
      </div>
      <el-form-item label="Email">
        <el-input
          v-model="form.username"
          name="username"
          type="email"
          placeholder="example@email.com"
        />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="******"
          autocomplete="off"
        />
      </el-form-item>
      <div class="signin__links">
        <el-checkbox v-model="checked">
          Remember me
        </el-checkbox>
        <el-button type="text">
          Forgot Password
        </el-button>
      </div>
      <el-button
        class="signin__submit"
        type="primary"
        :disabled="tryingToLogIn"
      >
        Login
      </el-button>
      <p v-if="authError">
        There was an error logging in to your account.
      </p>
    </el-form>
  </div>
</template>

<style lang="scss" src="./signin.scss" />
