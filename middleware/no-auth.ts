export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token')

  if (!token.value) {
    if (to.redirectedFrom) {
      // pass
      return to.redirectedFrom
    }
  } else {
    return navigateTo('/', { external: true })
  }
})
