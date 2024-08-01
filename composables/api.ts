export function $api<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1],
): Promise<any> {
  const config = useRuntimeConfig()

  return $fetch<T>(`${config.app.apiBaseUrl}${request}`, {
    ...opts,
    headers: {
      // Authorization: auth.logged ? `Bearer ${auth.accessToken}` : '',
      ...opts?.headers,
    },
  })
}