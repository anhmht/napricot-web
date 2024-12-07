<template>
  <div :class="$style.post">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: 'posts', path: '/post' }]" />
      </div>
    </div>
    <div class="container">
      <div v-if="data" v-loading="status === 'pending'" :class="$style.list">
        <post-item v-for="post in data?.posts" :key="post._id" :post="post" />
      </div>
      <div :class="$style.pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :default-current-page="1"
          :page-size="pagination.limit"
          :current-page="pagination.page"
          :total="data?.total"
          @current-change="pagination.page = $event"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOgImageComponent('DefaultOg')

useServerSeoMeta({
  title: () => `Posts | Napricot Post`,
  description: () => `we are dedicated to creating personalized
          products that celebrate the most meaningful people and cherished
          moments in your life`,
  ogTitle: () => `Posts | Napricot Post`,
  ogDescription: () => `we are dedicated to creating personalized
          products that celebrate the most meaningful people and cherished
          moments in your life`
})

/** Filter and pagination */
const filter = ref<PostFilter>({
  title: '',
  status: PostStatus.published,
  sort: 'createdAt'
})
const pagination = ref<Pagination>({
  page: 1,
  limit: 15
})

const { data, status, error } = await useAsyncData(
  'post',
  async () => {
    return await $postService.getPosts(filter.value, pagination.value)
  },
  {
    watch: [filter, pagination]
  }
)

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Content not found',
    fatal: true
  })
}
</script>

<style lang="postcss" module>
.breadcrumb {
  background-color: var(--color-background);
  color: var(--color-icon);
  padding: 8px 0;
}
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 24px 0;
}
.pagination {
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  padding: 24px 0;
  :global(.el-pagination) {
    button {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-background-grayscale-100);
      background-color: #fff !important;
    }
  }
  :global(.el-pager) {
    li {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-background-grayscale-100);
    }
  }
}
</style>
