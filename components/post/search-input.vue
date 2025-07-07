<template>
  <div :class="$style.searchInput">
    <div :class="$style.title">Search</div>
    <custom-search-input @search="emit('search', $event)" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search'])
</script>

<style lang="postcss" module>
.searchInput {
  position: relative;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  :global(.el-input__wrapper) {
    padding: 8px 16px;
  }
}
.title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
}
</style>
