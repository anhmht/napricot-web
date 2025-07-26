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

useHead({
  title: 'Napricot Eyelash Beauty',
  meta: [
    {
      name: 'description',
      content:
        'Napricot empowers personal expression through exquisitely crafted, personalized items.'
    }
  ]
})
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
