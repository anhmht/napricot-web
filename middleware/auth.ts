export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const user = window.localStorage.getItem('user')
    if (!user) {
      if (to.redirectedFrom) {
        // pass
        return to.redirectedFrom
      }
    } else {
      return abortNavigation()
    }
  }
})
