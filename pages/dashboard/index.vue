<template>
  <div :class="$style.dashboard">
    <h1>Welcome to Dashboard</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<style lang="postcss" module>
.main {
  display: block;
}
</style>
