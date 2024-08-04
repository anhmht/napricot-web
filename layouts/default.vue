<template>
  <div :class="$style.main">
    <announcement />
    <layout-header />
    <div :class="$style.breadcrumb">
      <slot name="breadcrumb" />
    </div>
    <div class="container">
      <slot />
    </div>
    <layout-footer />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.main {
  position: relative;
}
.breadcrumb {
  background-color: var(--color-background);
  color: var(--color-icon);
  padding: 8px 0;
}
</style>
