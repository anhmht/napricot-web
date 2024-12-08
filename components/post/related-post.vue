<template>
  <div :class="$style.related">
    <div :class="$style.title">Related Posts</div>
    <div :class="$style.posts">
      <post-sidebar-item v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  categoryId: {
    type: String,
    default: undefined
  },
  postId: {
    type: String,
    default: undefined
  }
})
const category = ref<string | undefined>(props.categoryId)
const data = ref<ListPosts | undefined>(undefined)
const posts = computed(() => {
  return (
    data.value?.posts.filter((post) => post._id !== props.postId).slice(0, 2) ||
    []
  )
})

const getPosts = async () => {
  data.value = await $postService.getPosts(
    {
      sort: 'updatedAt',
      categoryId: props.categoryId
    },
    { page: 1, limit: 4 }
  )
}

watch(
  () => props.categoryId,
  async (newValue, oldValue) => {
    console.log(category.value, newValue)

    if (!oldValue && newValue === category.value) return
    await getPosts()
  },
  { flush: 'post', immediate: true }
)
</script>

<style lang="postcss" module>
.related {
  position: relative;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}
.title {
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 16px;
}
.posts {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
