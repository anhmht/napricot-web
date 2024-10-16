<template>
  <div :class="$style.tags">
    <NuxtLink
      :to="`/categories?tags=[${tag}]`"
      v-for="(tag, index) in tags"
      :key="index"
    >
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tags: {
    type: Array as () => String[],
    default: []
  }
})
</script>

<style module lang="postcss">
.tags {
  display: flex;
  gap: 8px;
  a {
    padding: 4px 8px;
    border-radius: 4px;
    background-color: var(--color-primary);
    color: var(--color-background);
    font-size: 1.2rem;
    text-decoration: none;
  }
}
</style>
