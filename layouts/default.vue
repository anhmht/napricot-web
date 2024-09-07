<template>
  <div :class="$style.main">
    <announcement />
    <layout-header />
    <div v-if="store.showOverlay" :class="$style.overlay"></div>
    <slot />
    <layout-footer />
  </div>
</template>

<script setup lang="ts">
const store = useMainStore()
const nuxtApp = useNuxtApp()

const { data } = await useAsyncData(
  'categories',
  () => $categoryService.getAllCategories(),
  {
    transform(input) {
      return {
        ...input,
        fetchedAt: new Date()
      }
    },
    getCachedData(key) {
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      // fetch new Data
      if (!data) {
        return
      }
      const expirationTime = new Date(data.fetchedAt)
      expirationTime.setTime(expirationTime.getTime() + 1000 * 10)
      const isExpired = Date.now() > expirationTime.getTime()
      // fetch new Data
      if (isExpired) {
        return
      }
      return data
    }
  }
)

if (data.value) store.setCategories(data.value)
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
</style>
