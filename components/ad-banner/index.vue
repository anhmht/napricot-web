<template>
  <div :class="$style.banner">
    <nuxt-img
      provider="cloudflare"
      src="/51f64545-6417-4083-5e4e-c3d211e16e00/thumbnail344"
      :srcset="`${imageUrl}/51f64545-6417-4083-5e4e-c3d211e16e00/thumbnail344 344w,
            ${imageUrl}/51f64545-6417-4083-5e4e-c3d211e16e00/public 1410w`"
      sizes="344 md:1410"
      alt="Napricot Banner 1"
      type="image/avif"
      fit="inside"
    />
  </div>
</template>

<script setup lang="ts">
const {
  app: { imageUrl }
} = useRuntimeConfig()
</script>

<style lang="postcss" module>
.banner {
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  @media (max-width: 1410px) {
    padding: 0 16px;
  }
}
</style>
