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
      <!--      <v-alert type="success">asas</v-alert>-->
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Register form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="fullName"
              label="Full Name"
              prepend-icon="mdi-account"
              type="text"
              :error-messages="modelstate['Name']"
            />

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

            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  readonly
                  :error-messages="modelstate['BirthDay']"
                  v-on="on"
                />
              </template>
              <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1900-01-01"
                @change="save"
              />
            </v-menu>
            <recaptcha
              @error="onError"
              @success="onSuccess"
              @expired="onExpired"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" to="login">
            Back to Login
          </v-btn>
          <v-spacer />
          <v-btn color="primary" @click="Submit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: 'guest',
  name: 'Register',
  data: () => ({
    modelstate: {},
    date: null,
    menu: false,
    fullName: '',
    password: '',
    email: ''
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    onError (error) {
      console.log('Error happened:', error)
    },
    onSuccess (token) {
      console.log('Succeeded:', token)
    },
    onExpired () {
      console.log('Expired')
    },
    async Submit () {
      try {
        const token = await this.$recaptcha.getResponse()
        console.log('ReCaptcha token:', token)
      } catch (error) {
        console.log('Login error:', error)
        return
      }
      this.modelstate = {}
      const data = {
        Name: this.fullName,
        Email: this.email,
        Password: this.password,
        BirthDay: this.date
      }
      this.$axios.$post('/api/User/Register', data).then((response) => {
        alert('Success')
      })
        .catch((error) => {
          if (error.response.status === 400) {
            this.modelstate = error.response.data.errors
          }
        })
    },
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>

<style scoped>

</style>
