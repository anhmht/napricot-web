<template>
  <div :class="$style.sidebar">
    <post-search-input />
    <post-categories />
    <post-related-post :category-id="post.categoryId" :post-id="post._id" />
    <post-tags :tags="post.tags" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  post: {
    type: Object as () => IPost,
    default: undefined
  }
})
</script>

<style lang="postcss" module>
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
