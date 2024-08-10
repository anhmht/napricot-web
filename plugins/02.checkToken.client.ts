
export default defineNuxtPlugin(async (nuxt: any) => {
  if (import.meta.client) {
    const user = window.localStorage.getItem('user')

    if (user) {
      const store = useMainStore()
      try {
        store.setCurrentUser(JSON.parse(user))
        const newUserData = await $userService.getMe()
        store.setCurrentUser(newUserData)
      } catch (error) {
        store.setCurrentUser(undefined)
        window.localStorage.removeItem('user')
        window.location.reload()
      }
    }
  }
})
