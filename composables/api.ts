export function $api<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1]
): Promise<any> {
  const config = useRuntimeConfig()
  const store = useMainStore()
  return $fetch<T>(`${config.public.apiBaseUrl}${request}`, {
    ...opts,
    headers: {
      Authorization: store.currentUser
        ? `Bearer ${store.currentUser.token}`
        : '',
      ...opts?.headers
    }
  })
}
