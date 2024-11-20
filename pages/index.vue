<template>
  <div class="container">
    <div :class="$style.home">
      <carousel />
      <sales />
      <trending />
      <client-only>
        <shop-by-product />
      </client-only>
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
  padding-bottom: 36px;
  @media (max-width: 768px) {
    gap: 16px;
    padding-bottom: 16px;
  }
}
</style>
