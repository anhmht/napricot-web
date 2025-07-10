export function $api<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1]
): Promise<any> {
  const config = useRuntimeConfig()

  // Check if body is FormData to avoid setting Content-Type
  const isFormData = opts?.body instanceof FormData

  // On server side, we need to forward cookies from the original request
  const headers: any = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    Accept: 'application/json',
    ...opts?.headers
  }

  // If running on server, forward cookies from the incoming request
  if (import.meta.server) {
    const event = useRequestEvent()
    if (event?.node?.req?.headers?.cookie) {
      headers.cookie = event.node.req.headers.cookie
    }
  }

  return $fetch<T>(`${config.public.apiBaseUrl}${request}`, {
    ...opts,
    headers,
    credentials: 'include',
    onResponseError({ request, response, options }) {
      // Handle CORS errors specifically
      if (response.status === 0 || response.status === 401) {
        console.warn('API Request failed:', request, response.status)
      }
    }
  })
}

export function $operationApi<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Parameters<typeof $fetch<T>>[1]
): Promise<any> {
  const config = useRuntimeConfig()

  // On server side, we need to forward cookies from the original request
  const headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...opts?.headers
  }

  // If running on server, forward cookies from the incoming request
  if (import.meta.server) {
    const event = useRequestEvent()
    if (event?.node?.req?.headers?.cookie) {
      headers.cookie = event.node.req.headers.cookie
    }
  }

  return $fetch<T>(`${config.public.operationUrl}${request}`, {
    ...opts,
    headers,
    credentials: 'include',
    onResponseError({ request, response, options }) {
      // Handle CORS errors specifically
      if (response.status === 0 || response.status === 401) {
        console.warn('API Request failed:', request, response.status)
      }
    }
  })
}
