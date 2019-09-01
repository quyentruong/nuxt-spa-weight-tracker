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
          <v-toolbar-title>Your Profile</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              prepend-icon="mdi-email"
              type="email"
              disabled
            />

            <v-text-field
              v-model="fullname"
              prepend-icon="mdi-account"
              type="text"
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="Submit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="showInfo" color="info" :right="true">
        <v-icon>mdi-alert-circle-outline</v-icon>
        <span>This feature will be implemented later</span>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'Profile',
  data: () => ({
    loginShow: false,
    modelstate: {},
    email: '',
    fullname: '',
    menu: false,
    date: null,
    showInfo: false
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  created () {
    // this.email = this.$auth.$state.user.email
    // this.fullname = this.$auth.$state.user.name
    // this.date = new Date(this.$auth.$state.user.birthDay).toISOString().substr(0, 10)
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    Submit () {
      this.showInfo = true
    }
  }
}
</script>

<style scoped>

</style>
