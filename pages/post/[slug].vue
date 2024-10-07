<template>
  <div :class="$style.post">
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
          <div class="ck-content" v-html="data?.content"></div>
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
const { data, error } = useAsyncData(async () => {
  const post = await $postService.getPostBySlug(slug)
  return { ...post }
})
const title = computed(() => data?.value?.title || '')
</script>

<style lang="postcss" module>
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
</style>
