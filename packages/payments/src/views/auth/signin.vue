<script>
import { authMethods } from '~/state/helpers'

export default {
  name: 'Signin',
  data() {
    return {
      form: {
        email: null,
        password: null,
        remember: true,
      },
      rules: {
        email: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'This field is required',
            trigger: 'blur',
          },
        ],
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
        email: this.form.email,
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
    toHome() {
      this.$router.push({
        name: 'home',
      })
    },
  },
}
</script>

<template>
  <div class="signin">
    <div class="signin__inner">
      <div class="signin__inner-left" />
      <div class="signin__inner-right">
        <div class="signin__content">
          <div class="signin__logo">
            <img
              class="signin__logo-img"
              src="@/assets/logo.png"
              alt="Logo EONX"
            >
          </div>

          <el-form
            ref="form"
            class="signin__form"
            :model="form"
            :rules="rules"
            label-position="top"
            label-width="100px"
          >
            <el-form-item
              label="Email"
              prop="email"
            >
              <el-input
                v-model="form.email"
                name="email"
                type="email"
                placeholder="example@email.com"
              />
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password"
            >
              <el-input
                v-model="form.password"
                type="password"
                placeholder="************"
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
              @click="toHome"
            >
              Login
            </el-button>
            <p v-if="authError">
              There was an error logging in to your account.
            </p>
          </el-form>

          <div class="signin__footer">
            <div class="signin__footer-row">
              2019 All Rights Reserved. EonX Ltd.
            </div>
            <div class="signin__footer-row">
              <router-link
                :to="{path: '/'}"
                class="signin__footer-link"
              >
                Privacy & Terms.
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./signin.scss"/>
