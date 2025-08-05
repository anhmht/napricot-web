<template>
  <NuxtLink :class="$style.sidebarItem" :to="`/post/${post.slug}`">
    <NuxtImg
      :src="post.image?.cloudflareUrl"
      :alt="post.title"
      :srcset="`${post.image?.thumbnailUrl} 100w, ${post.image?.cloudflareUrl} 1200w`"
      sizes="100 md:1200"
      loading="lazy"
      data-width="auto"
      data-height="auto"
    />
    <div :class="$style.info">
      <h4>{{ post.title }}</h4>
      <ClientOnly>
        <span>{{ formatDate(post.createdAt) }}</span>
      </ClientOnly>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  post: {
    type: Object as () => IPost,
    default: undefined
  }
})
</script>

<style lang="postcss" module>
.sidebarItem {
  position: relative;
  display: flex;
  gap: 16px;
  text-decoration: none;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  &:hover {
    img {
      opacity: 0.8;
    }
    h4 {
      color: var(--color-primary);
    }
  }
}
.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
  h4 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
    color: var(--color-text);
  }
  span {
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--color-icon);
  }
}
</style>
