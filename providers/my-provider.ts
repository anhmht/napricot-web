import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image-edge'

export const getImage: ProviderGetImage = (
  src,
  { baseURL } = {}
) => {

  if (!baseURL) {
    // also support runtime config
    baseURL = useRuntimeConfig().app.imageUrl;
  }

  return {
    url: joinURL(baseURL, src),
  }
}
