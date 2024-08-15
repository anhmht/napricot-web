<template>
  <div id="hot-offers" :class="$style.banner">
    <NuxtPicture
      format="webp"
      loading="lazy"
      :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/154c0562-5694-4a08-0bd6-c02c971d9100/banner690`"
      alt="Napricot Banner"
      width="690"
      height="290"
    />
    <NuxtPicture
      format="webp"
      loading="lazy"
      :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/dda547f1-23ef-4bcf-b3d9-56aa4151b500/banner690`"
      alt="Napricot Banner"
      width="690"
      height="290"
    />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<style lang="postcss" module>
.banner {
  scroll-margin-top: 150px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  picture {
    display: flex;
  }
}
</style>
