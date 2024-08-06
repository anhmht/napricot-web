<template>
  <div id="hot-offers" :class="$style.banner">
    <NuxtPicture
      format="webp"
      loading="lazy"
      src="images/banner/banner-3.png"
      alt="Napricot Banner"
      width="690"
      height="290"
    />
    <NuxtPicture
      format="webp"
      loading="lazy"
      src="images/banner/banner-4.png"
      alt="Napricot Banner"
      width="690"
      height="290"
    />
  </div>
</template>

<script setup lang="ts"></script>

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
