<template>
  <div :class="[$style.banner, $device.isMobileOrTablet ? $style.mobile : '']">
    <NuxtPicture
      :src="`${
        config.app.baseUrl
      }/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/51f64545-6417-4083-5e4e-c3d211e16e00/${
        $device.isDesktop ? 'public' : 'thumbnail344'
      }`"
      format="webp"
      alt="Napricot Banner 1"
      :width="$device.isDesktop ? 1410 : 343"
      :height="$device.isDesktop ? 340 : 144"
    />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<style lang="postcss" module>
.banner {
  position: relative;
  &.mobile {
    padding: 0 16px;
  }
  picture {
    display: flex;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
