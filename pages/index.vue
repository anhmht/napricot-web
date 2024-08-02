<template>
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
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.home {
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 36px 0;
}
</style>
