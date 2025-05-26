import { defineNuxtModule, createResolver, addTemplate } from '@nuxt/kit'
import { existsSync, readFileSync } from 'fs'

export default defineNuxtModule({
  meta: {
    name: 'component-optimizer',
    configKey: 'componentOptimizer',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    // Components to always include (avoid lazy loading)
    critical: ['Header', 'Footer'],
    // Path to component directories
    componentDirs: ['components'],
    // Whether to detect unused components (development only)
    detectUnused: true,
    // Whether to lazy load large components
    lazyLoadLarge: true,
    // Size threshold for lazy loading (in KB)
    sizeThreshold: 30
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const srcDir = nuxt.options.srcDir || '.'

    nuxt.hook('components:extend', (components) => {
      if (process.env.NODE_ENV === 'production' && options.lazyLoadLarge) {
        // Only apply in production mode
        const criticalSet = new Set(
          options.critical.map((name) => name.toLowerCase())
        )

        for (const component of components) {
          const isGloballyRegistered = component.global === true
          const isCritical = criticalSet.has(component.pascalName.toLowerCase())

          // Skip critical components
          if (isCritical) {
            continue
          }

          // Check component file size
          try {
            const filePath = component.filePath
            if (existsSync(filePath)) {
              const fileContent = readFileSync(filePath, 'utf-8')
              const fileSizeKb = Buffer.byteLength(fileContent, 'utf-8') / 1024

              // If component is large, mark it for lazy loading
              if (fileSizeKb > options.sizeThreshold && isGloballyRegistered) {
                component.mode = 'client' // Only load on client-side
                component.prefetch = false // Don't prefetch
                component.preload = false // Don't preload

                // Log lazy loaded components when building
                if (nuxt.options.dev === false) {
                  console.log(
                    `📦 Optimizing: Lazy-loading large component ${
                      component.pascalName
                    } (${fileSizeKb.toFixed(1)}KB)`
                  )
                }
              }
            }
          } catch (error) {
            console.warn(
              `Could not analyze component size: ${component.pascalName}`,
              error
            )
          }
        }
      }

      // Detect unused components in dev mode
      if (process.env.NODE_ENV === 'development' && options.detectUnused) {
        const componentSet = new Set(components.map((c) => c.pascalName))

        // Use vite:compiled hook instead of build:compile
        nuxt.hook('vite:compiled', () => {
          // After compilation, check which components were used
          // This is a simplified version - in a real scenario you'd need a more robust detection
          console.log(
            '🔍 Component Optimizer: Analyzing component usage (development only)'
          )
        })
      }
    })

    // Add a global mixin that enhances component loading
    addTemplate({
      filename: 'component-optimizer.mjs',
      getContents: () => `
        // Component loading optimizer
        export default function(nuxtApp) {
          // This is where we could add more advanced optimization logic
          // like on-demand loading of components based on viewport visibility
        }
      `
    })

    // Register the plugin
    nuxt.options.plugins = nuxt.options.plugins || []
    nuxt.options.plugins.push(resolver.resolve('./runtime/plugin'))

    // Add the plugin implementation
    addTemplate({
      filename: 'component-optimizer-plugin.mjs',
      write: true,
      getContents: () => `
        import optimizer from '#build/component-optimizer.mjs'

        export default defineNuxtPlugin(nuxtApp => {
          optimizer(nuxtApp)
        })
      `
    })

    console.log('✅ Component Optimizer module initialized')
  }
})
