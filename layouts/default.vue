<template>
  <div :class="$style.main">
    <announcement />
    <layout-header />
    <div v-if="store.showOverlay" :class="$style.overlay"></div>
    <div :class="$style.page">
      <slot />
    </div>
    <layout-footer />
    <custom-notification />
  </div>
</template>

<script setup lang="ts">
const store = useMainStore()

const { data } = await useAsyncData('categories', () =>
  $categoryService.getAllCategories()
)
const config = useRuntimeConfig()

if (data.value) store.setCategories(data.value)

const route = useRoute()

if (!config.public.isDevelopment) {
  // Google Analytics
  const { proxy } = useScriptGoogleAnalytics({
    id: 'G-6K500GJZ6H'
  })

  ;(proxy.gtag as any)('js', new Date())
  ;(proxy.gtag as any)('config', 'G-6K500GJZ6H')

  proxy.dataLayer.push({
    event: 'page_view',
    path: route.path
  })

  // Google Ads (Google Tag Manager)
  const { proxy: gtmProxy } = useScriptGoogleTagManager({
    id: 'AW-17125966453'
  })

  // Configure Google Ads through dataLayer
  gtmProxy.dataLayer.push({
    event: 'config',
    google_ads_id: 'AW-17125966453'
  })

  // Send page view event to GTM (client-side only)
  if (process.client) {
    gtmProxy.dataLayer.push({
      event: 'pageview',
      page_path: route.path,
      page_title: document?.title || ''
    })
  }
}

useHead(() => {
  const canonicalPath =
    route.path.endsWith('/') && route.path !== '/'
      ? route.path.slice(0, -1)
      : route.path === '/'
      ? ''
      : route.path

  return {
    link: [
      {
        rel: 'canonical',
        href: `https://napricot.com${canonicalPath}`
      }
    ]
  }
})
</script>

<style lang="postcss" module>
.main {
  position: relative;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.page {
  padding-top: 54px;
  @media (max-width: 768px) {
    padding-top: 46px;
    h1 {
      font-size: 3.5rem;
    }
    h2 {
      font-size: 3rem;
    }
  }
}
</style>
