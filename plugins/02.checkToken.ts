export default defineNuxtPlugin(async (nuxt: any) => {
  const token = useCookie('auth_token')
  if (token.value) {
    const { checkAuthStatus } = useAuth()
    await checkAuthStatus()
  }
})
