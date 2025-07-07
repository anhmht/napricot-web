<template>
  <div v-if="isRoot" :class="$style.wrapper">
    <div :class="$style.highlight" :style="{ '--top-index': top }"></div>
  </div>
  <ul
    :id="isRoot ? 'toc' : undefined"
    :class="[$style.toc, isRoot && $style.root]"
  >
    <li v-for="(item, index) in data" :key="index">
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
        :toc-ids="tocIds"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
export type TableOfContentItem = {
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
    default: ''
  },
  slug: {
    type: String,
    default: ''
  },
  tocIds: {
    type: Array as () => string[],
    default: []
  }
})

const activeValue = computed<string>(() => {
  return props.active || ''
})

const isRoot = computed<boolean>(() => !!props.content)

const top = computed<number>(() => {
  if (import.meta.server) return 0
  const index = props.tocIds.indexOf(activeValue.value!)
  return index === -1 ? 0 : index
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
        font-weight: 700;
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
