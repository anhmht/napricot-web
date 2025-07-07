<template>
  <div :class="$style.post">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: 'posts', path: '/post' }]" />
      </div>
    </div>
    <div class="container" v-loading="status === 'pending'">
      <div :class="$style.filter">
        <custom-search-input :class="$style.search" @search="search" />
        <div :class="$style.select">
          Categories:
          <el-select-v2
            :model-value="filter.categoryId"
            :options="categories"
            placeholder="Please select"
            :class="$style.select"
            :empty-values="[undefined, null]"
            @change="handleChange"
          />
        </div>
        <div :class="$style.select">
          Sort:
          <el-select-v2
            :model-value="filter.sort"
            :options="sorts"
            placeholder="Please select"
            :class="$style.select"
            :empty-values="[undefined, null]"
            @change="handleSort"
          />
        </div>
      </div>
      <div v-if="data" :class="$style.list">
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
          @current-change="pagination = { ...pagination, page: $event }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from '~/utils'
import { OptionType } from 'element-plus/lib/components/select-v2/src/select.types.js'
/** Filter and pagination */
const filter = ref<PostFilter>({
  title: '',
  status: PostStatus.published,
  sort: 'createdAt',
  categoryId: ''
})
const pagination = ref<Pagination>({
  page: 1,
  limit: 15
})
const { getCategories } = useMainStore()
const categories = computed<OptionType[]>(() => {
  return [
    { label: 'All categories', value: '' },
    ...(getCategories(CategoryType.Post) || []).map((category) => ({
      label: category.name,
      value: category._id
    }))
  ]
})
const sorts = computed<OptionType[]>(() => {
  return [
    { label: 'Latest Post', value: 'createdAt' },
    { label: 'Last Updated', value: 'updatedAt' }
  ]
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

const handleChange = (value: string) => {
  filter.value.categoryId = value
  pagination.value = {
    ...pagination.value,
    page: 1
  }
}

const handleSort = (value: string) => {
  filter.value.sort = value
  pagination.value = {
    ...pagination.value,
    page: 1
  }
}

const { data, status, error, refresh } = await useAsyncData(
  'posts-fetch',
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
</script>

<style lang="postcss" module>
.breadcrumb {
  background-color: var(--color-background);
  color: var(--color-icon);
  padding: 8px 0;
}
.filter {
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  padding-top: 24px;
}
.search {
  margin-right: auto;
  :global(.el-input__wrapper) {
    width: 300px;
  }
}
.select {
  display: flex;
  gap: 8px;
  align-items: center;
  :global(.el-select__wrapper) {
    width: 270px;
  }
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
