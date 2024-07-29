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
