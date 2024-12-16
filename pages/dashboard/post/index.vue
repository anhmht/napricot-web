<template>
  <div :class="$style.post">
    <layout-dashboard-header title="Posts">
      <template #action>
        <custom-button
          type="danger"
          :disabled="!selectedRows.length"
          @click="handleDelete(selectedRows.map((c) => c._id!))"
        >
          <i class="icon-delete"></i>
          Delete</custom-button
        >
        <custom-button
          type="primary"
          @click="navigateTo('/dashboard/post/create')"
        >
          <i class="icon-add"></i>
          Add Post</custom-button
        >
      </template>
    </layout-dashboard-header>
    <div :class="$style.content" v-loading="status === 'pending'">
      <layout-dashboard-filter
        search-name="Posts"
        @search="search"
        @sort="handleSort"
      />
      <dashboard-post-table
        :list="posts"
        v-model:pagination="pagination"
        v-model:selected-rows="selectedRows"
        @delete="handleDelete([$event])"
        @edit="navigateTo(`/dashboard/post/${$event}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'

definePageMeta({
  layout: 'dashboard',
  middleware: 'authorize'
})

const { notification } = useWebSocket()

const posts = ref<ListPosts | undefined>(undefined)

/** Table ref */
const selectedRows = ref<IPost[]>([])

/** Filter and pagination */
const filter = ref<PostFilter>({
  title: '',
  sort: ''
})
const pagination = ref<Pagination>({
  page: 1,
  limit: 10
})

const handleSearch = debounce((query: string) => {
  filter.value.title = query || undefined
  pagination.value = {
    ...pagination.value,
    page: 1
  }
}, 500)

const search = (query: string) => {
  handleSearch(query.trim())
}

const handleSort = (sort: string) => {
  filter.value.sort = sort
  pagination.value = {
    ...pagination.value,
    page: 1
  }
}

const handleDelete = async (ids: string[]) => {
  ElMessageBox.confirm('Do you want to delete this post?', 'Confirm', {
    type: 'warning',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        await $postService.deletePosts(ids)
        done()
      } else {
        done()
      }
    }
  })
    .then(async () => {
      ElNotification.success({
        title: 'Post deleted successfully',
        message: 'Post has been deleted'
      })
      reloadList()
    })
    .catch(() => {
      // catch error
    })
}

const reloadList = () => {
  refresh()
}

const { status, refresh } = await useAsyncData(
  'post',
  async () => {
    const res = await $postService.getPosts(filter.value, pagination.value)
    posts.value = res
  },
  {
    watch: [filter, pagination]
  }
)

watch(
  () => notification.value.postNotification,
  () => {
    const postNotification = notification.value.postNotification
    if (postNotification) {
      console.log(postNotification)
      const { id, uploading } = postNotification
      const post = posts.value?.posts.find((p) => p._id === id)
      if (post) {
        post.uploading = uploading
      }
    }
  }
)
</script>

<style lang="postcss" module>
.post {
  position: relative;
}
.content {
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
