<template>
  <div :class="$style.banner">
    <NuxtPicture
      :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/51f64545-6417-4083-5e4e-c3d211e16e00/public`"
      format="webp"
      alt="Napricot Banner 1"
      width="1410"
      height="340"
    />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<style lang="postcss" module>
.banner {
  position: relative;
  picture {
    display: flex;
  }
}
</style>
