<template>
  <div id="hot-offers" :class="$style.banner">
    <NuxtImg
      provider="myProvider"
      loading="lazy"
      src="/154c0562-5694-4a08-0bd6-c02c971d9100/thumbnail344"
      :srcset="`${imageUrl}/154c0562-5694-4a08-0bd6-c02c971d9100/thumbnail344 343w,
            ${imageUrl}/154c0562-5694-4a08-0bd6-c02c971d9100/banner690 1410w`"
      sizes="343 md:1410"
      alt="Napricot Banner 1"
    />
    <NuxtImg
      provider="myProvider"
      loading="lazy"
      src="/dda547f1-23ef-4bcf-b3d9-56aa4151b500/thumbnail344"
      :srcset="`${imageUrl}/dda547f1-23ef-4bcf-b3d9-56aa4151b500/thumbnail344 343w,
            ${imageUrl}/dda547f1-23ef-4bcf-b3d9-56aa4151b500/banner690 1410w`"
      sizes="343 md:1410"
      alt="Napricot Banner 2"
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
  scroll-margin-top: 150px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
}
</style>
