<template>
  <div :class="$style.main">
    <carousel />
    <sales />
    <trending />
    <shop-by-product />
    <best-seller />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.main {
  display: block;
}
</style>
