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
            />

            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="mdi-lock"
              type="password"
              :error-messages="modelstate['Password']"
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
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
    Login () {
      // try {
      //   const token = await this.$recaptcha.getResponse()
      //   console.log('ReCaptcha token:', token)
      // } catch (error) {
      //   console.log('Login error:', error)
      //   return
      // }
      this.modelstate = {}
      const data = {
        Email: this.email,
        Password: this.password
      }

      this.$axios.$post(`https://trackapi2.azurewebsites.net/api/user/login`, data).then((response) => {
        alert('Success')
      })
        .catch((error) => {
          if (error.response.status === 400) {
            this.modelstate = error.response.data.errors
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
