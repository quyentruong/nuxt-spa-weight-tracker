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
          <v-toolbar-title>Setting</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-btn class="mb-4" @click="TwoFA">
            Two-step Authentication
          </v-btn>
          <v-card :class="twoFAShow ? '' : 'd-none'">
            <v-card-text>
              Add a layer of security to your account by requiring security codes from one of <a href="https://support.mozilla.org/en-US/kb/secure-firefox-account-two-step-authentication" target="_blank" style="text-decoration: none">these authentication apps</a>.
              <v-img
                :src="qrLink"
                :lazy-src="qrLink"
              />
              Scan the QR code in your authentication app and then enter the security code it provides. <a :class="codeShow?'d-none':''" @click="codeShow=true">Can’t scan code?</a>
              <p :class="codeShow?'':'d-none'">
                Manually enter this secret key into your authentication app:
                <br>
                <span class="green--text">{{ code }}</span>
              </p>
              <v-text-field type="text" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary">
                Confirm
              </v-btn>
              <v-spacer />
              <v-btn @click="CancelAction">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Setting',
  data: () => ({
    codeShow: false,
    twoFAShow: false,
    qrLink: '',
    code: ''
  }),
  created () {
    this.qrLink = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQMAAACXljzdAAAABlBMVEX///8AAABVwtN+AAACI0lEQVRYheWYQY6jQAxFjbKoZR2BmzQXixSkXAxuwhFqyQLhed9FZtL7jkeaKbUS4CH1l8v+dsXsX1vO2spiNjQb98nLUnlyJpLd7Lb5yg1PJOmrznxkksmfW/FmeqOcxhtP39OJr624H+ZL3b/+CiEkCsjoi6KTTRQVrjy0oXH5tnMJJHKUkJS13Uc+uHzP3gRyrSqNTmhUMN/WxwlCnioRm9DG/nSNSyLBIfqT0x6uDOHeUsluFa/ycAo8q+rSy5lIsKljdJxiag894c3ZUsk+kKNUB9rmkTQJbf7zRC48kon80ztJ0VBwhC/kEcOBFIul4o3kgysTz0Qi+yP3665d4EbunEvQ8tgQqGqU0nDpcOUsQlQOVR9/dGl3kuSuTMkk+ACCWLOiRG3MY/frJGIDHYkQRXVY71BjdKYs0vdnahpS5MbU6zHumYQ6PWRDvS/QG5UprwpOIZjDbVNU2BcJdWm9+nYOKYoGISnKFHVniPf9SSJEQzMSToE2zUhrdOtEQp3OY3dJbk69adf+/ChRIW4UhDqfZjG9aZe2LKI+wP6v0RTbzgnpmkOyyNBujibyYY6hRPOpZ5JYysSTeZRQkYTUhiWSl5Y+AS01ziXlTCRxLrE4FVATE6eCl7Y00rtx7W48tMiTV5VkErPuxrizonWmEzKDb1dnWpgX/5xcM0j8ToFRDb+78/z+C8bnSeQoI3tER+dTzQtvJ9fPk/9l/QJWeLMJykavGwAAAABJRU5ErkJggg=='
    this.code = '3VMH74G4AU3FITS7'.match(/.{1,4}/g).join(' ')
  },
  methods: {
    TwoFA () {
      this.twoFAShow = true
    },
    CancelAction () {
      this.twoFAShow = false
      this.codeShow = false
    }
  }
}
</script>

<style scoped>

</style>
