// https://materialdesignicons.com/
import colors from 'vuetify/es5/util/colors'

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.NODE_ENV !== 'development' ? {
  router: {
    base: '/nuxt-spa-weight-tracker/',
    middleware: ['auth']
  },
  env: {
    baseURL: 'https://trackapi2.azurewebsites.net'
  }
} : {
  env: {
    baseURL: 'https://localhost:5001'
  }
  // router: {
  //   middleware: ['auth']
  // }
}

export default {
  ...routerBase,
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${process.env.DEPLOY_ENV === 'GH_PAGES' ? '/nuxt-spa-weight-tracker' : ''}/favicon.ico`
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/vue-apexcharts.client'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/toast',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/recaptcha',
    ['vue-warehouse/nuxt', {
      vuex: true
    }]
  ],
  recaptcha: {
    siteKey: '6LdA47AUAAAAAHgoSOBrxHt_gpgtvodDhBs9Atl4', // Site key for requests
    version: 2 // Version
  },
  toast: {
    position: 'bottom-center',
    duration: 5000,
    iconPack: 'mdi',
    register: [ // Register custom toasts
      {
        name: 'my_error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `${process.env.DEPLOY_ENV === 'GH_PAGES' ? 'https://trackapi2.azurewebsites.net' : 'https://trackapi2.azurewebsites.net'}`
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/user/login', method: 'post', propertyName: 'token' },
          user: { url: '/api/user/GetCurrentUser', method: 'get', propertyName: false },
          logout: false
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    watchLoggedIn: true,
    resetOnError: true
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
