export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token')

  if (token.value) {
    const store = useMainStore()
    const user = toRaw(store.currentUser)

    if (!user) {
      return navigateTo('/', { external: true })
    }

    if (user.token !== token.value.replaceAll('-', '.')) {
      return navigateTo('/', { external: true })
    }

    if (!user.roles?.includes(ROLE.ADMIN) && !user.roles?.includes(ROLE.SUPER_ADMIN)) {
      return navigateTo('/', { external: true })
    }

    if (to.redirectedFrom) {
      // pass
      return to.redirectedFrom
    }
  } else {
    return navigateTo('/', { external: true })
  }
})
