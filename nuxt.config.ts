import { RuntimeConfig, getRunTimeConfig } from './config/RuntimeConfig'
import { defineOrganization } from 'nuxt-schema-org/schema'

// import { visualizer } from 'rollup-plugin-visualizer'
const TARGET_ENV = process.env.TARGET_ENV ?? 'staging'

const runtimeConfig: RuntimeConfig = getRunTimeConfig(TARGET_ENV)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  vite: {
    build: {
      // Speed up build with these Vite optimizations
      cssCodeSplit: true,
      reportCompressedSize: false,
      target: 'esnext'
    },
    optimizeDeps: {
      // Enable dependency pre-bundling cache
      force: false,
      entries: [
        './pages/**/*.vue',
        './components/**/*.vue',
        './layouts/**/*.vue'
      ]
    },
    // Enable Vite build cache
    cacheDir: 'node_modules/.vite',
    // Disable HMR polling to reduce CPU usage during build
    server: {
      hmr: {
        protocol: 'wss'
      },
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..']
      }
    }
  },

  build: {
    // Enable Nuxt build cache
    analyze: false
  },

  /*
   ** SSL on local development (checkout README.md for instructions)
   */
  devServer: {
    host: 'dev.napricot.com',
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
      title: 'Napricot Eyelash Beauty',
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          key: 'description',
          name: 'description',
          content:
            'Napricot Eyelash Beauty offers pre-made lash fans designed for perfectionists combining comfort, curl consistency, and pro-level performance.'
        }
      ]
    }
  },

  schemaOrg: {
    identity: defineOrganization({
      '@type': ['Organization', 'Store', 'OnlineStore'],
      // Basic Information
      name: 'Napricot Eyelash Beauty',
      logo: '	https://napricot.com/cdn-cgi/imagedelivery/veUt9Fr…kw/8a7c1d2c-57eb-4120-5bb6-47e54128e600/thumbnail'
    })
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    experimentalCompression: true,
    experimentalWarmUp: true,
    exclude: [
      '/email-verification',
      '/reset-password',
      '/forgot-password',
      '/sign-in',
      '/dashboard',
      '/policy'
    ]
  },

  robots: {
    disallow: [
      '/dashboard',
      '/policy',
      '/email-verification',
      '/reset-password',
      '/forgot-password',
      '/sign-in'
    ],
    sitemap: 'https://napricot.com/sitemap.xml'
  },

  // Disable SEO validation warnings
  seo: {
    debug: false
  },

  linkChecker: {
    enabled: false
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
    // Additional optimization to avoid deprecation warnings
    esbuild: {
      options: {
        target: 'esnext',
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true
          }
        }
      }
    },
    moduleSideEffects: ['@nuxtjs/seo'],
    // Enable experimental features for better caching
    experimental: {
      wasm: true
    }
  },

  routeRules: {
    '/post/**': {
      isr: true
    },
    '/': {
      isr: true
    },
    '/sitemap.xml': {
      isr: true
    }
  },

  runtimeConfig: {
    public: {
      ...runtimeConfig
    }
  },

  socialShare: {
    baseUrl: process.env.BASE_URL // required!
  },

  components: true,

  // Component optimizer configuration
  componentOptimizer: {
    critical: ['LayoutHeader', 'LayoutFooter', 'NuxtLink', 'NuxtPage'],
    lazyLoadLarge: true,
    sizeThreshold: 25
  },

  image: {
    domains: ['napricot.com'],
    // Disable IPX to prevent /_ipx/_/ prefix in URLs
    ipx: {
      // Set to false to disable IPX processing entirely for your custom provider
      modifiers: {}
    },
    providers: {
      myProvider: {
        name: 'myProvider', // optional value to overrider provider name
        provider: '~/providers/my-provider.ts' // Path to custom provider
      }
    },
    // Set default provider to use your custom provider
    provider: 'myProvider'
  },

  css: [
    // CSS file in the project
    '~/assets/styles/main.css'
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/seo',
    '@nuxt/scripts',
    '~/modules/component-optimizer'
  ],

  imports: {
    dirs: ['store/*.ts', 'models/*.ts', 'services/*.ts', 'data/*.ts']
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      autoprefixer: {}
    }
  },

  // Enable persistent build cache
  typescript: {
    shim: false,
    typeCheck: false
  },

  compatibilityDate: '2024-10-02'
})
