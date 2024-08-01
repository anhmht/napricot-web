<template>
  <div :class="$style.dashboard">
    <layout-sidebar />
  </div>
  <div :class="$style.content">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.dashboard {
  display: flex;
  overflow: hidden;
}
</style>
