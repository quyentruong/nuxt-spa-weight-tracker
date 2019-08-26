<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs12
      sm8
      md4
    >
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              prepend-icon="mdi-email"
              type="email"
              :error-messages="modelstate['Email']"
              @keyup.enter="Login"
            />

            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="mdi-lock"
              type="password"
              :error-messages="modelstate['Password']"
              @keyup.enter="Login"
            />

            <!--            <recaptcha-->
            <!--              @error="onError"-->
            <!--              @success="onSuccess"-->
            <!--              @expired="onExpired"-->
            <!--            />-->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" to="register">
            Register
          </v-btn>
          <v-spacer />
          <v-btn color="primary" @click="Login">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="loginShow" color="blue" :timeout="0">
        Please wait ...
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
import authenticated from '../middleware/authenticated'
export default {
  middleware: authenticated,
  name: 'Login',
  data: () => ({
    loginShow: false,
    modelstate: {},
    email: '',
    password: ''
  }),
  methods: {
    // onError (error) {
    //   console.log('Error happened:', error)
    // },
    // onSuccess (token) {
    //   console.log('Succeeded:', token)
    // },
    // onExpired () {
    //   console.log('Expired')
    // },
    async Login () {
      // try {
      //   const token = await this.$recaptcha.getResponse()
      //   console.log('ReCaptcha token:', token)
      // } catch (error) {
      //   console.log('Login error:', error)
      //   return
      // }
      this.loginShow = true
      this.modelstate = {}
      const data = {
        Email: this.email,
        Password: this.password
      }
      try {
        const response = await this.$axios.$post(`/api/user/login`, data)
        this.$warehouse.set('user', response)
        await this.$router.push('/')
        location.reload()
      } catch (error) {
        if (error.response.status === 400) {
          this.modelstate = error.response.data.errors
          // this.$store.commit('setAuthentication', true)
        }
      }
      this.loginShow = false
    }
  }
}
</script>

<style scoped>

</style>
