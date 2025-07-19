export default defineNuxtRouteMiddleware(async (to) => {
  const { startLoading, stopLoading } = useLoading()
  const { user } = useAuth()
  try {
    if (import.meta.client) {
      startLoading()
    }
    if (user.value) {
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
