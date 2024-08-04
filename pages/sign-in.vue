<template>
  <div :class="$style.signIn">
    <NuxtLayout name="default">
      <template #breadcrumb> HEADER </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
</script>

<style lang="postcss" module>
.signIn {
  position: relative;
}
</style>
