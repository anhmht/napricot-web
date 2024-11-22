<template>
  <div :class="$style.root" v-loading="isLoading">
    <div v-for="item in words" :key="item._id" :class="$style.item">
      <div :class="$style.info">
        <div>{{ item.words }}</div>
        <NuxtLink :to="item.url" target="_blank">
          {{ item.url }}
        </NuxtLink>
      </div>
      <div :class="$style.button">
        <custom-button type="primary" @click="submit(item)">
          Apply
        </custom-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import unescape from 'lodash/unescape'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
const { $eventBus } = useNuxtApp()

const emit = defineEmits(['update:content', 'change'])
const data = ref<ILink[]>([])
const isLoading = ref<boolean>(false)

const words = computed<ILink[]>(() => {
  const matchWords = findWords()
  return data.value.filter((item) => matchWords.includes(item.words))
})

const submit = async (item: ILink) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(props.content, 'text/html')

  const replacementLink = `<a href="${item.url}">${item.words}</a>`

  // Helper function to replace text in text nodes
  function replaceTextContent(node) {
    if (node.nodeType === Node.TEXT_NODE && node.parentNode.tagName !== 'A') {
      // Only replace visible occurrences of the target string
      node.textContent = node.textContent.replaceAll(
        item.words,
        replacementLink
      )
    } else {
      node.childNodes.forEach((child) => replaceTextContent(child))
    }
  }

  // Select all tags except <img>, <a>, <figure>, and <figcaption>
  const eligibleTags = doc.querySelectorAll(
    '*:not(html):not(head):not(body):not(div):not(img):not(a):not(figure):not(figcaption)'
  )

  // Apply replacement to eligible tags
  eligibleTags.forEach((tag) => {
    replaceTextContent(tag)
  })

  $eventBus.emit('replaceLink', unescape(doc.body.innerHTML))
  emit('update:content', unescape(doc.body.innerHTML))
  emit('change', unescape(doc.body.innerHTML))
}

const findWords = () => {
  // Remove <a>, <img>, <figure>, <figcaption> tags and all their attributes and content
  const sanitizedContent = props.content
    .replace(/<a[^>]*>.*?<\/a>/gi, '') // Remove <a> tag and its content
    .replace(/<img[^>]*>/gi, '') // Remove <img> tag and its attributes
    .replace(/<figure[^>]*>.*?<\/figure>/gi, '') // Remove <figure> tag and its content
    .replace(/<figcaption[^>]*>.*?<\/figcaption>/gi, '') // Remove <figcaption> tag and its content

  // Create a regex pattern to match only exact words from the array
  const wordPattern = `\\b(${data.value
    .map((w) => w.words)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})\\b`
  const pattern = new RegExp(wordPattern, 'gi')

  // Find matches in the sanitized content
  const matches = sanitizedContent.match(pattern) || []

  // Remove duplicates and return unique matches in lowercase
  return Array.from(new Set(matches))
}

onMounted(async () => {
  isLoading.value = true
  const { links } = await $linkService.getAllLinks()
  data.value = links
  isLoading.value = false
})
</script>

<style module lang="postcss">
.root {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.item {
  display: flex;
  padding: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  gap: 16px;
}
.info {
  flex: 1;
  a {
    text-decoration: none;
    font-size: 1.4rem;
    color: var(--color-primary);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    &:hover {
      opacity: 0.8;
    }
  }
}
.button {
  button {
    height: 40px;
    padding: 0 16px;
  }
}
</style>
