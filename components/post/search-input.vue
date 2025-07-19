<template>
  <div :class="$style.searchInput">
    <div :class="$style.title">Search</div>
    <custom-field
      v-model="searchQuery"
      placeholder="Search posts..."
      @keyup="handleSearch"
      @input="handleSearch"
    >
      <template #suffix>
        <i class="icon-search" @click="handleSearch" />
      </template>
    </custom-field>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search'])
const searchQuery = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value.trim())
}
</script>

<style lang="postcss" module>
.searchInput {
  position: relative;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}
.title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
}
</style>
