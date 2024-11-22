<template>
  <ul :class="[$style.toc, isRoot && $style.root]">
    <li v-for="(item, index) in list" :key="index">
      <NuxtLink :to="`#${item.id}`">{{ item.title }}</NuxtLink>
      <table-of-content v-if="item.children.length" :data="item.children" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CheerioAPI, load } from 'cheerio'

type TableOfContentItem = {
  id: string
  title: string
  level: number
  children: TableOfContentItem[]
}
const props = defineProps({
  content: {
    type: String,
    default: undefined
  },
  data: {
    type: Object as () => TableOfContentItem[],
    default: []
  }
})

const isRoot = computed<boolean>(() => !!props.content)

const generateTableOfContents = computed<TableOfContentItem[] | undefined>(
  () => {
    if (!isRoot.value) return undefined

    // Load the HTML body into Cheerio
    const $: CheerioAPI = load(props.content!)

    // Extract all heading elements (h1 to h6)
    const headings = $('h1, h2, h3, h4, h5, h6').toArray()

    // Build ToC structure
    const toc: TableOfContentItem[] = []
    const stack: { level: number; children: TableOfContentItem[] }[] = []

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName[1], 10)
      const $heading = $(heading)
      const id =
        $heading.attr('id') ||
        $heading.text().trim().replace(/\s+/g, '-').toLowerCase() // Generate an ID if none exists
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
    console.log(toc)

    return toc
  }
)

const list = computed<TableOfContentItem[]>(() => {
  return generateTableOfContents.value || props.data
})
</script>

<style module lang="postcss" scoped>
.toc {
  list-style: none;
  padding-left: 20px;
  margin: 0;
  &.root {
    padding-left: 0;
    > li:first-child {
      padding-top: 0;
    }
  }
  li {
    padding-top: 4px;
    a {
      text-decoration: none;
      color: var(--color-icon);
      font-weight: 400;
      &:hover {
        color: var(--color-text);
      }
    }
  }
}
</style>
