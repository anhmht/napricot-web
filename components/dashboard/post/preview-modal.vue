<template>
  <div :class="$style.preview">
    <el-drawer
      :model-value="open"
      direction="btt"
      @close="$emit('update:open', false)"
      size="100%"
      :class="$style.previewDrawer"
    >
      <template #header>
        <h2>Post Preview</h2>
      </template>
      <template #default>
        <layout-header />
        <div :class="$style.page">
          <div :class="$style.breadcrumb">
            <div class="container">
              <breadcrumb
                :links="[
                  { name: 'posts', path: '/post' },
                  { name: post.title, path: `/post/${post.slug}` }
                ]"
              />
            </div>
          </div>
          <div class="container">
            <div :class="$style.blog">
              <div :class="$style.content">
                <article>
                  <h1>
                    {{ post.title }}
                  </h1>
                  <div :class="$style.info">
                    <div :class="$style.date">
                      <span>Created: </span>
                      <span>Updated: </span>
                    </div>
                    <client-only>
                      <social-share-component />
                    </client-only>
                  </div>
                  <div :class="$style.desc">
                    {{ post.desc }}
                  </div>
                  <div class="ck-content" v-html="post.content"></div>
                </article>
                <post-tags :class="$style.tags" :tags="post?.tags" />
              </div>
              <div :class="$style.sidebar">
                <nav>
                  <div>
                    <div :class="$style.toc">
                      <div :class="$style.tocTitle">Table of Contents</div>
                      <div :class="$style.tocContent">
                        <table-of-content
                          :data="generateTableOfContents"
                          :active="activeId || undefined"
                          :content="post?.content"
                          :slug="post?.slug"
                          :toc-ids="tocIds"
                        />
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <layout-footer />
      </template>
    </el-drawer>
    <div v-if="open" :class="$style.overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { CheerioAPI, load } from 'cheerio'
import { TableOfContentItem } from '~/components/table-of-content/index.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  post: {
    type: Object as () => IPost,
    default: () => ({})
  }
})

const { activeId, tocIds } = useActiveToc()

const generateTableOfContents = computed<TableOfContentItem[] | undefined>(
  () => {
    // Load the HTML body into Cheerio
    const $: CheerioAPI = load(props.post?.content!)

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
</script>

<style module lang="postcss">
.preview {
  display: block;
}
.page {
  padding-top: 54px;
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
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
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
:global(.el-drawer__header) {
  margin: 0;
  button {
    height: auto;
  }
}
:global(.el-drawer__body) {
  padding-top: 0;
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
