<template>
  <div :class="$style.list">
    <h4 v-if="title">{{ title }}</h4>
    <div :class="$style.posts">
      <post-item v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  postId: {
    type: String,
    default: ''
  },
  limit: {
    type: Number,
    default: 4
  }
})
const data = ref<ListPosts | undefined>(undefined)
const posts = computed(() => {
  if (!data.value) return []
  return (
    data.value?.posts.filter((post) => post._id !== props.postId).slice(0, 2) ||
    []
  )
})
onMounted(async () => {
  data.value = await $postService.getPosts(
    {
      sort: 'createdAt'
    },
    { page: 1, limit: props.limit }
  )
})
</script>

<style lang="postcss" module>
.list {
  h4 {
    margin-bottom: 24px;
  }
  padding-bottom: 24px;
}
.posts {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
