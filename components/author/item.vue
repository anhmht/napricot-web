<template>
  <NuxtLink :class="$style.item" :to="`/author/${author.slug}`">
    <NuxtImg
      :src="author.avatar?.cloudflareUrl"
      :alt="author.name"
      :srcset="`${author.avatar?.thumbnailUrl} 398w, ${author.avatar?.cloudflareUrl} 1200w`"
      sizes="398 md:1200"
      loading="lazy"
      data-width="auto"
      data-height="auto"
    />
    <div :class="$style.info">
      <h5>{{ author.name }}</h5>
      <p>{{ author.description }}</p>
      <button>Read More</button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  author: {
    type: Object as () => IAuthor,
    default: undefined
  }
})
</script>

<style lang="postcss" module scoped>
.item {
  width: 454px;
  text-decoration: none;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.04);
  img {
    display: block;
    width: 100%;
    height: 248px;
    object-fit: cover;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:hover {
    img {
      opacity: 0.8;
    }
  }
}
.info {
  padding: 24px;
  padding-top: 16px;
  border: 1px solid #e4e7e9;
  border-top: none;
  min-height: 186px;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: #8b8b8b;
  }
  h5 {
    font-weight: 700;
    font-size: 1.8rem;
    color: var(--color-text);
    margin-bottom: 12px;
    height: 52px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  p {
    font-weight: 400;
    font-size: 1.6rem;
    color: #8b8b8b;
    margin-bottom: 24px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 48px;
  }
  button {
    background: #fff;
    border-radius: 4px;
    padding: 16px 48px;
    border: 1px solid var(--color-primary);
    font-weight: 700;
    font-family: 'SVN-Circular';
    width: fit-content;
    margin-top: auto;
    cursor: pointer;
    transition: all 0.2s;
  }
  &:hover {
    button {
      background: var(--color-primary);
      color: #fff;
    }
    h5 {
      color: var(--color-primary);
    }
  }
}
@media (max-width: 768px) {
  .item {
    width: 100%;
  }
}
</style>
