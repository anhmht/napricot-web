
export default defineNuxtPlugin(async (nuxt: any) => {
  const token = useCookie('token')
  if (token.value) {
    const store = useMainStore()
    try {
      const jwt = token.value.replaceAll('*napricot*', '.')
      // set the api header token
      store.setCurrentUser({ token: jwt })
      const user = await $userService.getMe()
      store.setCurrentUser({ ...user, token: jwt })
    } catch (error) {
      console.log(error);
      store.setCurrentUser(undefined)
      token.value = undefined
    }
  }
})
