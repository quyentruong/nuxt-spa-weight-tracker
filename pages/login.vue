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
          <v-btn color="primary" to="/register" :disabled="hasClicked">
            Go to Register
          </v-btn>
          <v-spacer />
          <v-btn color="primary" :disabled="hasClicked" @click="Login">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  auth: 'guest',
  name: 'Login',
  data: () => ({
    hasClicked: false,
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
      this.hasClicked = true
      // try {
      //   const token = await this.$recaptcha.getResponse()
      //   console.log('ReCaptcha token:', token)
      // } catch (error) {
      //   console.log('Login error:', error)
      //   return
      // }
      this.$toast.show('Logging in...', { icon: 'timer-sand-empty' })

      this.modelstate = {}
      const data = {
        Email: this.email,
        Password: this.password
      }
      await this.$auth.loginWith('local', { data })
        .then(() => {
          this.$toast.success('Successfully authenticated', { icon: 'check-bold' })
          this.hasClicked = false
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.modelstate = error.response.data.errors
            this.$toast.global.my_error() // Using custom toast
            this.$toast.error('Error while authenticating')
            this.hasClicked = false
            // this.$store.commit('setAuthentication', true)
          }
        })
      // try {
      //   const response = await this.$axios.$post(`/api/user/login`, data)
      //   this.$warehouse.set('user', response)
      // } catch (error) {
      //   if (error.response.status === 400) {
      //     this.modelstate = error.response.data.errors
      //     // this.$store.commit('setAuthentication', true)
      //   }
      // }
    }
  }
}
</script>

<style scoped>

</style>
