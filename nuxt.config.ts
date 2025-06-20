import { RuntimeConfig, getRunTimeConfig } from './config/RuntimeConfig'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
const TARGET_ENV = process.env.TARGET_ENV ?? 'staging'
import fontsPreload from './config/Font'
import routes from './dynamic-routes.json'

const runtimeConfig: RuntimeConfig = getRunTimeConfig(TARGET_ENV)

// Add module declaration
declare module '@nuxt/schema' {
  interface NuxtConfig {
    componentOptimizer?: {
      critical?: string[]
      lazyLoadLarge?: boolean
      sizeThreshold?: number
    }
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  experimental: {
    componentIslands: true,
    payloadExtraction: true,
    typedPages: true,
    treeshakeClientOnly: true
  },

  vite: {
    plugins: [
      nodePolyfills(),
      {
        name: 'suppress-warnings',
        configResolved(config) {
          // This is a custom plugin to suppress specific deprecation warnings
          const originalWarn = console.warn
          console.warn = (...args) => {
            // Suppress DEP0166 warnings
            if (typeof args[0] === 'string' && args[0].includes('DEP0166')) {
              return
            }
            originalWarn.apply(console, args)
          }
        }
      }
    ],
    build: {
      // Speed up build with these Vite optimizations
      cssCodeSplit: true,
      reportCompressedSize: false,
      target: 'esnext',
      // Don't use manual chunks for element-plus to fix CSS issues
      rollupOptions: {
        output: {
          // Remove manual chunks configuration to fix CSS issues
        }
      }
    },
    optimizeDeps: {
      include: ['element-plus']
    },
    // Disable HMR polling to reduce CPU usage during build
    server: {
      hmr: {
        protocol: 'ws'
      }
    },
    // Properly handle CSS from element-plus
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ''
        }
      }
    },
    // Configure Vite to handle font files properly
    assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.eot'],
    resolve: {
      alias: {
        // Add alias for fonts to help Vite resolve them
        '/fonts/': '/public/fonts/'
      }
    }
  },

  build: {
    // Enable build caching for faster rebuilds
    transpile: ['element-plus/es']
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
      title: 'Napricot | The best place to find gifts for your loved ones',
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Napricot is the best place to find gifts for your loved ones. We have a wide range of gifts for all occasions.'
        }
      ],
      link: [...fontsPreload]
    },
    // Ensure fonts are copied to the output directory
    buildAssetsDir: '/_nuxt/'
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
    disallow: ['/dashboard', '/policy']
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: routes as string[]
    },
    // Optimize server performance
    routeRules: {
      '/**': {
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400'
        }
      }
    },
    // Improve Nitro build performance
    future: {
      nativeSWR: true
    },
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
    moduleSideEffects: ['element-plus/nuxt', '@nuxtjs/seo']
  },

  routeRules: {
    '/dashboard/post/**': { ssr: false },
    '/sign-in': {
      prerender: true
    },
    '/reset-password': {
      prerender: true
    },
    '/forgot-password': {
      prerender: true
    },
    '/about-us': {
      prerender: true
    },
    '/policy/**': {
      prerender: true
    }
  },

  runtimeConfig: {
    app: {
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
    '@element-plus/nuxt',
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
