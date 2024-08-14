<template>
  <div :class="$style.main">
    <announcement />
    <layout-header />
    <div v-if="store.showOverlay" :class="$style.overlay"></div>
    <slot name="breadcrumb" />
    <div class="container">
      <slot />
    </div>
    <layout-footer />
  </div>
</template>

<script setup lang="ts">
const store = useMainStore()

const { data, error } = await useAsyncData('categories', () =>
  $categoryService.getAllCategories()
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
