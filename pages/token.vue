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
              v-model="token"
              label="Email"
              prepend-icon="mdi-email"
              type="email"
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
  name: 'Token',
  data: () => ({
    modelstate: {},
    token: ''

  }),
  methods: {
    Login () {
      this.modelstate = {}
      // const data = this.token

      this.$axios.$post(`https://localhost:5001/api/user/VerifyToken`, { token: this.token }).then((response) => {
        alert('Success')
      })
        .catch((error) => {
          if (error.response.status === 400) {
            // eslint-disable-next-line no-console
            console.log(error.response.data)
            this.modelstate = error.response.data.errors
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
