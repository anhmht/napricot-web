<template>
  <div :class="$style.post">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb
          :links="[
            { name: 'posts', path: '/post' },
            { name: title, path: `/post/${slug}` }
          ]"
        />
      </div>
    </div>
    <div class="container">
      <div :class="$style.blog">
        <div :class="$style.content">
          <article>
            <h1>
              {{ title }}
            </h1>
            <div :class="$style.info">
              <div :class="$style.date">
                <ClientOnly>
                  <span>Created: {{ formatDate(data?.createdAt) }}</span>
                  <span>Updated: {{ formatDate(data?.updatedAt) }}</span>
                </ClientOnly>
              </div>
              <ClientOnly>
                <social-share-component />
              </ClientOnly>
            </div>
            <div :class="$style.desc">
              {{ data?.desc }}
            </div>
            <div class="ck-content" v-html="data?.content"></div>
          </article>
          <post-tags :class="$style.tags" :tags="data?.tags" />
        </div>
        <div v-if="data" :class="$style.sidebar">
          <nav>
            <div>
              <div :class="$style.toc">
                <div :class="$style.tocTitle">Table of Contents</div>
                <div :class="$style.tocContent">
                  <table-of-content
                    :data="generateTableOfContents"
                    :active="activeId || undefined"
                    :content="data?.content"
                    :slug="data?.slug"
                    :toc-ids="tocIds"
                  />
                </div>
              </div>
              <post-sidebar :post="data || undefined" />
            </div>
          </nav>
        </div>
      </div>
      <div :class="$style.latest">
        <post-list title="Latest Post" :post-id="data?._id" />
      </div>
    </div>
    <post-download-url :post="data" v-if="data?.externalUrl && social" />
    <custom-loading :loading="status === 'pending'" />
  </div>
</template>

<script lang="ts" setup>
import { CheerioAPI, load } from 'cheerio'
import { TableOfContentItem } from '~/components/table-of-content/index.vue'

const route = useRoute()
const social = !!route.query.social as boolean
const { slug } = route.params as { slug: string }
const { data, error, status } = useAsyncData(
  'post-fetch-' + slug,
  async () => {
    const post = await $postService.getPostBySlug(slug)
    return { ...post }
  },
  {
    watch: [() => slug]
  }
)
const title = computed(() => data?.value?.title || '')
const image = computed(() => data.value?.image?.cloudflareUrl + 'large' || '')
const desc = computed(() => data?.value?.desc || '')
const createdDate = computed(() => data?.value?.createdAt || '')
const updatedDate = computed(() => data?.value?.updatedAt || '')
const keywords = computed(() => data?.value?.keywords || '')

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Content not found',
    fatal: true
  })
}

const { activeId, tocIds } = useActiveToc()

const generateTableOfContents = computed<TableOfContentItem[] | undefined>(
  () => {
    // Load the HTML body into Cheerio
    const $: CheerioAPI = load(data?.value?.content!)

    // Extract all heading elements (h1 to h6)
    const headings = $('h1, h2, h3').toArray()

    // Build ToC structure
    const toc: TableOfContentItem[] = []
    const stack: { level: number; children: TableOfContentItem[] }[] = []

    tocIds.value = []
    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1], 10)
      const $heading = $(heading)
      const id =
        $heading.attr('id') ||
        $heading.text().trim().replace(/\s+/g, '-').toLowerCase() // Generate an ID if none exists
      tocIds.value.push(id)
      const item = {
        level,
        id,
        title: $heading.text().trim() || '',
        children: []
      }

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop()
      }

      if (stack.length) {
        stack[stack.length - 1].children.push(item)
      } else {
        toc.push(item)
      }
      stack.push(item)
    })
    return toc
  }
)

defineOgImageComponent('BlogPost', {
  title,
  image,
  desc
})

useServerSeoMeta({
  title: () => `${title.value}`,
  description: () => desc.value,
  ogTitle: () => `${title.value}`,
  ogSiteName: () => 'Napricot Eyelash Beauty',
  ogDescription: () => desc.value,
  ogImage: () => image.value
})

definePageMeta({
  schemaOrg: {
    name: 'Napricot Eyelash Beauty',
    description: desc.value,
    headline: title.value,
    keywords: Array.isArray(keywords.value) ? keywords.value.join(',') : '',
    image: image.value,
    url: `https://napricot.com/post/${slug}`,
    datePublished: createdDate.value,
    dateModified: updatedDate.value,
    inLanguage: 'en'
  }
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
  padding: 24px;
  background: #fff0e8;
  border-left: 4px solid var(--color-primary);
  font-style: italic;
}
.blog {
  padding: 36px 0;
  display: flex;
  gap: 48px;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 962px;
  article {
    display: flex;
    flex-direction: column;
    gap: 24px;
    h1 {
      font-size: 3.6rem;
      font-weight: 700;
    }
  }
}
.sidebar {
  width: 400px;
  nav {
    position: sticky;
    top: 126px;
    overflow-y: auto;
    > div {
      padding-bottom: 32px;
    }
  }
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
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
.toc {
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin-bottom: 24px;
}
.tocTitle {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
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
    height: 72px;
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
