<template>
  <div v-if="isRoot" :class="$style.wrapper">
    <div :class="$style.highlight" :style="{ '--top-index': top }"></div>
  </div>
  <ul
    :id="isRoot ? 'toc' : undefined"
    :class="[$style.toc, isRoot && $style.root]"
  >
    <li v-for="(item, index) in list" :key="index">
      <NuxtLink
        :data-id="item.id"
        :class="activeValue === item.id && $style.active"
        :to="`#${item.id}`"
        >{{ item.title }}</NuxtLink
      >
      <table-of-content
        v-if="item.children.length"
        :data="item.children"
        :active="activeValue"
      />
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
  },
  active: {
    type: String,
    default: undefined
  }
})
const tocIds = ref<string[]>([])

const { activeId } = useActiveToc(tocIds.value)

const activeValue = computed<string>(() => activeId.value || props.active || '')

const isRoot = computed<boolean>(() => !!props.content)

const top = computed<number>(() => {
  if (import.meta.server) return 0
  const index = tocIds.value.indexOf(activeValue.value!)
  return index === -1 ? 0 : index
})

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
    margin: 0 16px;
    > li:first-child {
      padding-top: 0;
    }
  }
  li {
    padding-top: 4px;
    a {
      height: 23px;
      text-decoration: none;
      color: var(--color-icon);
      font-weight: 400;
      max-width: 340px;
      display: inherit;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      transition: all 0.3s ease-in-out;
      &.active {
        color: var(--color-text);
        font-weight: 500;
      }
      &:hover {
        color: var(--color-text);
      }
    }
  }
}
.wrapper {
  position: relative;
  width: 4px;
}
.highlight {
  width: 4px;
  height: 24px;
  background: var(--color-primary);
  position: absolute;
  top: calc(var(--top-index) * 27px);
  transition: all 0.3s ease-in-out;
}
</style>
