<template>
  <NuxtLink :class="$style.item" :to="`/post/${post.slug}`">
    <NuxtPicture
      :src="post.image?.cloudflareUrl + '/large500'"
      :alt="post.title"
      width="424"
      height="248"
    />
    <div :class="$style.info">
      <span>{{ formatDate(post.createdAt) }}</span>
      <h5>{{ post.title }}</h5>
      <p>{{ post.desc }}</p>
      <button>Read More</button>
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
.item {
  width: 454px;
  text-decoration: none;
  picture {
    display: flex;
    img {
      object-fit: cover;
    }
  }
  &:hover {
    picture {
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
  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: #8b8b8b;
  }
  h5 {
    font-weight: 500;
    font-size: 1.8rem;
    color: var(--color-text);
    margin-bottom: 12px;
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
  }
  button {
    background: #fff;
    border-radius: 4px;
    padding: 16px 48px;
    border: 1px solid var(--color-primary);
    font-weight: 500;
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
</style>
