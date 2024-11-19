<template>
  <div v-if="data" :class="$style.post">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: title, path: `/post/${slug}` }]" />
      </div>
    </div>
    <div class="container">
      <div :class="$style.blog">
        <div :class="$style.content">
          <h1>
            {{ title }}
          </h1>
          <div :class="$style.info">
            <div :class="$style.date">
              <span>Created: {{ formatDate(data?.createdAt) }}</span>
              <span>Updated: {{ formatDate(data?.updatedAt) }}</span>
            </div>
            <social-share-component />
          </div>
          <div :class="$style.desc">
            {{ data?.desc }}
          </div>
          <article>
            <div class="ck-content" v-html="data?.content"></div>
          </article>
          <post-tags :class="$style.tags" :tags="data?.tags" />
        </div>
        <div :class="$style.sidebar">
          <post-sidebar :post="data || undefined" />
        </div>
      </div>
      <div :class="$style.latest">
        <post-list title="Latest Post" :post-id="data?._id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'ckeditor5/ckeditor5.css'

const slug = useRoute().params.slug as string
const { data, error } = useAsyncData('pageFetch', async () => {
  const post = await $postService.getPostBySlug(slug)
  return { ...post }
})
const title = computed(() => data?.value?.title || '')
const image = computed(() => data.value?.image?.cloudflareUrl + 'large' || '')
const desc = computed(() => data?.value?.desc || '')

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Content not found',
    fatal: true
  })
}
defineOgImageComponent('BlogPost', {
  title,
  image,
  desc
})

useServerSeoMeta({
  title: () => `${title.value}`,
  description: () => desc.value,
  ogTitle: () => `${title.value}`,
  ogDescription: () => desc.value
})
</script>

<style lang="postcss" module scoped>
.post {
  position: relative;
}
.breadcrumb {
  background-color: var(--color-background);
  color: var(--color-icon);
  padding: 8px 0;
}
.desc {
  font-weight: 400;
}
.blog {
  padding: 36px 0;
  display: flex;
  gap: 48px;
  h1 {
    font-size: 3.6rem;
    font-weight: 500;
  }
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 962px;
}
.sidebar {
  width: 400px;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .date {
    color: var(--color-icon);
    font-weight: 400;
    font-size: 1.4rem;
    display: flex;
    gap: 24px;
  }
}
.tags {
  display: none;
}
@media (max-width: 1120px) {
  .blog {
    padding: 16px;
    h1 {
      font-size: 3rem;
    }
  }
  .content {
    gap: 16px;
  }
  .info {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 16px;
  }
  .latest {
    padding: 16px;
  }
  .tags {
    display: flex;
  }
  .sidebar {
    display: none;
  }
}
</style>
