<template>
  <NuxtLink :class="$style.sidebarItem" :to="`/post/${post.slug}`">
    <NuxtPicture
      :src="post.image?.cloudflareUrl + 'hero'"
      :alt="post.title"
      width="100"
      height="100"
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
  picture {
    display: flex;
  }
  &:hover {
    picture {
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
    font-weight: 500;
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
