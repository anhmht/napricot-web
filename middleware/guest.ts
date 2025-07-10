export default defineNuxtRouteMiddleware(async (to) => {
  const { startLoading, stopLoading } = useLoading()
  const { checkAuthStatus } = useAuth()
  try {
    if (import.meta.client) {
      startLoading()
    }
    const user = await checkAuthStatus()
    if (user) {
      return navigateTo('/')
    }
  } catch (error) {
    return navigateTo('/')
  } finally {
    if (import.meta.client) {
      stopLoading()
    }
  }
})
