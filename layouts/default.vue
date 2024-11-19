<template>
  <div :class="$style.main">
    <announcement />
    <layout-header />
    <div v-if="store.showOverlay" :class="$style.overlay"></div>
    <div :class="$style.page">
      <slot />
    </div>
    <layout-footer />
  </div>
</template>

<script setup lang="ts">
const store = useMainStore()

const { data } = await useAsyncData('categories', () =>
  $categoryService.getAllCategories()
)
const { app } = useRuntimeConfig()

if (data.value) store.setCategories(data.value)

const route = useRoute()

if (!app.isDevelopment) {
  const { proxy } = useScriptGoogleAnalytics({
    id: 'G-6K500GJZ6H'
  })

  ;(proxy.gtag as any)('js', new Date())
  ;(proxy.gtag as any)('config', 'G-6K500GJZ6H')

  proxy.dataLayer.push({
    event: 'page_view',
    path: route.path
  })
}

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: 'https://napricot.com' + route.path
    }
  ]
}))
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
