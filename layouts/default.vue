<template>
  <div :class="$style.main">
    <announcement />
    <layout-header />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.main {
  position: relative;
}
</style>
