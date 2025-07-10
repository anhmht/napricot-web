export default defineNuxtRouteMiddleware(async (to, from) => {
  // Check if the current page has any custom middleware defined
  // This is a bit tricky in Nuxt 3, but we can check common patterns
  const hasCustomMiddleware =
    to.meta.middleware && to.meta.middleware.length > 0

  // Only run this middleware if no custom middleware is defined
  if (!hasCustomMiddleware) {
    const { startLoading, stopLoading } = useLoading()
    const { checkAuthStatus } = useAuth()
    try {
      if (import.meta.client) {
        startLoading()
      }
      await checkAuthStatus()
    } catch (error) {
    } finally {
      if (import.meta.client) {
        stopLoading()
      }
    }
  }
})
