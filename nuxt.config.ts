import { RuntimeConfig, getRunTimeConfig } from "./config/RuntimeConfig"

const TARGET_ENV = process.env.TARGET_ENV ?? 'staging'

const runtimeConfig: RuntimeConfig = getRunTimeConfig(TARGET_ENV)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  /*
   ** SSL on local development (checkout README.md for instructions)
   */
  // devServer: {
  //   port: Number(process.env.NUXT_PORT),
  //   https: {
  //     key: '.ssl/localhost.key',
  //     cert: '.ssl/localhost.crt'
  //   }
  // },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Napricot | The best place to find gifts for your loved ones',
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Napricot is the best place to find gifts for your loved ones. We have a wide range of gifts for all occasions.' }
      ],
    },
  },


  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  routeRules: {
    '/': { isr: true, prerender: true },
    '/sign-in': { isr: true, prerender: true },
    '/email-verification': { isr: true, prerender: true },
    '/forgot-password': { isr: true, prerender: true },
    '/reset-password': { isr: true, prerender: true },
  },

  runtimeConfig: {
    app: {
      ...runtimeConfig
    },
  },

  components: true,

  css: [
    // CSS file in the project
    '~/assets/styles/main.css'
  ],

  modules: ['@pinia/nuxt', "@nuxt/image", "@element-plus/nuxt"],

  imports: {
    dirs: ['store/*.ts', 'models/*.ts', 'services/*.ts', 'data/*.ts']
  },

  postcss: {
    plugins: {
      'postcss-nested': {}
    }
  }
})
