<template>
  <div :class="$style.update"></div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'authorize'
})
</script>

<style lang="postcss" module>
.update {
  position: relative;
}
</style>
