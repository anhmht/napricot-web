// Runtime plugin for component optimizer
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // Register a global performance tracking for components
    const start = performance.now()

    nuxtApp.hook('app:mounted', () => {
      const duration = Math.round(performance.now() - start)
      console.log(`⚡ Application mounted in ${duration}ms`)
    })
  }

  return {
    provide: {
      // Expose any needed utilities
      optimizeComponent: (name: string) => {
        // Could be used to manually optimize specific components
        // This is a placeholder for potential future functionality
        return true
      }
    }
  }
})
