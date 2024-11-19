import { RuntimeConfig, getRunTimeConfig } from "./config/RuntimeConfig"
import { nodePolyfills } from 'vite-plugin-node-polyfills'
const TARGET_ENV = process.env.TARGET_ENV ?? 'staging'
import fontsPreload from "./config/Font"

const runtimeConfig: RuntimeConfig = getRunTimeConfig(TARGET_ENV)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  experimental: {
    componentIslands: true,
    payloadExtraction: true,
  },

  vite: {
    plugins: [
      nodePolyfills()],
  },

  /*
   ** SSL on local development (checkout README.md for instructions)
   */
  devServer: {
    port: Number(process.env.NUXT_PORT),
    https: {
      key: '.ssl/localhost.key',
      cert: '.ssl/localhost.crt'
    }
  },

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
      link: [...fontsPreload]
    },
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    experimentalCompression: true,
    experimentalWarmUp: true,
    exclude: ['/email-verification', '/reset-password', '/forgot-password', '/sign-in', '/dashboard'],
  },

  robots: {
    disallow: ['/dashboard'],
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  routeRules: {
    '/dashboard/post/**': { ssr: false },
    '/sign-in': {
      prerender: true,
    },
    '/reset-password': {
      prerender: true,
    },
    '/forgot-password': {
      prerender: true,
    },
    '/about-us': {
      prerender: true
    },
  },

  runtimeConfig: {
    app: {
      ...runtimeConfig
    },
  },

  socialShare: {
    baseUrl: process.env.BASE_URL // required!
  },

  components: true,

  image: {
    domains: ['napricot.com'],
    providers: {
      myProvider: {
        name: 'myProvider', // optional value to overrider provider name
        provider: '~/providers/my-provider.ts', // Path to custom provider
      }
    }
  },

  css: [
    // CSS file in the project
    '~/assets/styles/main.css'
  ],

  device: {
    defaultUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36'
  },

  modules: [
    '@pinia/nuxt',
    "@nuxt/image-edge",
    "@element-plus/nuxt",
    "@stefanobartoletti/nuxt-social-share",
    "@nuxtjs/seo",
    "@nuxtjs/device",
    "@nuxt/scripts"
  ],

  imports: {
    dirs: ['store/*.ts', 'models/*.ts', 'services/*.ts', 'data/*.ts']
  },

  postcss: {
    plugins: {
      'postcss-nested': {}
    }
  },

  compatibilityDate: '2024-10-02',
})
