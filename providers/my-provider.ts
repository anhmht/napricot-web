import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image-edge'

export const getImage: ProviderGetImage = (
  src,
  { width, height, format, quality, fit } = {}
) => {
  const {
    public: { imageUrl }
  } = useRuntimeConfig()
  // Check if src is already a complete URL or already includes baseURL
  let url: string
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.includes(imageUrl) ||
    src.includes('.')
  ) {
    // src is already a complete URL or includes baseURL, use as is
    url = src
  } else {
    url = joinURL(imageUrl, src)
  }

  // Add query parameters for transformations if needed
  const params = new URLSearchParams()

  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  if (format) params.append('f', format)
  if (quality) params.append('q', quality.toString())
  if (fit) params.append('fit', fit)

  const queryString = params.toString()
  if (queryString) {
    url += `?${queryString}`
  }

  return {
    url
    // This tells Nuxt Image not to process this URL through IPX
    // isStatic: true
  }
}
