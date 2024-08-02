<template>
  <div :class="$style.banner">
    <NuxtPicture
      src="images/banner/banner-2.png"
      format="webp"
      alt="Napricot Banner 1"
      width="1410"
      height="340"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.banner {
  position: relative;
  picture {
    display: flex;
  }
}
</style>
