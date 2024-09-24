<template>
  <div :class="$style.post">
    <layout-dashboard-header title="Posts">
      <template #action>
        <custom-button type="danger" :disabled="!selectedRows.length" @click="">
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
        :list="data"
        v-model:pagination="pagination"
        v-model:selected-rows="selectedRows"
        @delete="handleDelete([$event])"
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
        done()
      } else {
        done()
      }
    }
  })
    .then(async () => {
      ElNotification.success({
        title: 'Category deleted successfully',
        message: 'Category has been deleted'
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

const { data, status, refresh } = await useAsyncData(
  'post',
  async () => {
    return await $postService.getPosts(filter.value, pagination.value)
  },
  {
    watch: [filter, pagination]
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
