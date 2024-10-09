<template>
  <div class="container">
    <div :class="$style.home">
      <carousel />
      <sales />
      <trending />
      <shop-by-product />
      <best-seller />
      <banner />
      <shop-by-recipient />
      <new-arrival />
      <ad-banner />
      <newsletter />
      <happy-customer />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent('DefaultOg')
</script>

<style lang="postcss" module>
.home {
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 36px 0;
}
</style>
