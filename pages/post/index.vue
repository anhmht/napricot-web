<template>
  <div class="post">
    <div class="breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: 'posts', path: '/post' }]" />
      </div>
    </div>
    <div class="container page-container">
      <div class="filter">
        <custom-field
          v-model="searchQuery"
          class="search"
          placeholder="Search posts..."
          @keyup="handleSearchKeyup"
          @input="handleSearchInput"
        >
          <template #suffix>
            <i class="icon-search" @click="handleSearchKeyup" />
          </template>
        </custom-field>
        <div class="select-wrapper">
          Categories:
          <custom-select
            class="select"
            :model-value="filter.categoryId"
            :options="categories"
            placeholder="Please select"
            clearable
            @change="handleChange"
          />
        </div>
        <div class="select-wrapper">
          Sort:
          <custom-select
            class="select"
            :model-value="filter.sort"
            :options="sorts"
            placeholder="Please select"
            clearable
            @change="handleSort"
          />
        </div>
      </div>
      <div v-if="data" class="list">
        <post-item v-for="post in data?.posts" :key="post._id" :post="post" />
      </div>
      <div class="pagination">
        <Pagination
          v-model="pagination.page"
          :page-size="pagination.limit"
          :total="data?.total || 0"
          :show-total="false"
          :show-first-last="false"
          @change="pagination = { ...pagination, page: $event }"
        />
      </div>
      <custom-loading :loading="status === 'pending'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from '~/utils'
import type { SelectOption } from '~/components/custom/select/index.vue'
import Pagination from '~/components/custom/pagination/index.vue'
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

// Search query reactive variable
const searchQuery = ref('')
const { getCategories } = useMainStore()
const categories = computed<SelectOption[]>(() => {
  return [
    { label: 'All categories', value: '' },
    ...(getCategories(CategoryType.Post) || [])
      .filter((category) => category._id)
      .map((category) => ({
        label: category.name,
        value: category._id as string
      }))
  ]
})
const sorts = computed<SelectOption[]>(() => {
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

const handleSearchInput = () => {
  handleSearch(searchQuery.value.trim())
}

const handleSearchKeyup = () => {
  handleSearch(searchQuery.value.trim())
}

const handleChange = (
  value: string | number | string[] | number[] | undefined
) => {
  filter.value.categoryId = (value as string) || ''
  pagination.value = {
    ...pagination.value,
    page: 1
  }
}

const handleSort = (
  value: string | number | string[] | number[] | undefined
) => {
  filter.value.sort = (value as string) || 'createdAt'
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
    watch: [filter, pagination],
    lazy: true
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
  title: () => `Posts`,
  description: () => `we are dedicated to creating personalized
          products that celebrate the most meaningful people and cherished
          moments in your life`,
  ogTitle: () => `Posts`,
  ogSiteName: () => 'Napricot Eyelash Beauty',
  ogDescription: () => `we are dedicated to creating personalized
          products that celebrate the most meaningful people and cherished
          moments in your life`
})

definePageMeta({
  schemaOrg: {
    name: 'Napricot Eyelash Beauty',
    description: `Discover meaningful content across multiple topics. At Napricot, we share knowledge, creativity, and inspiration — one post at a time.`
  }
})
</script>

<style lang="postcss" scoped>
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
  padding: 24px 16px;

  /* Tablet and below */
  @media (max-width: 1024px) {
    gap: 16px;
    flex-wrap: wrap;
  }

  /* Mobile */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
}

.search {
  margin-right: auto;
  width: 300px;

  /* Tablet and below */
  @media (max-width: 1024px) {
    width: 250px;
  }

  /* Mobile */
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    order: -1; /* Move search to top on mobile */
  }
}

.page-container {
  min-height: calc(100vh - 300px);

  /* Mobile */
  @media (max-width: 768px) {
    min-height: calc(100vh - 250px);
  }
}

.select-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;

  /* Mobile */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }

  /* Small mobile */
  @media (max-width: 480px) {
    gap: 6px;
  }
}

.select {
  display: flex;
  gap: 8px;
  align-items: center;
  min-width: 270px;
  flex-direction: row;

  /* Tablet and below */
  @media (max-width: 1024px) {
    min-width: 220px;
  }

  /* Mobile */
  @media (max-width: 768px) {
    min-width: 100%;
    width: 100%;
  }

  /* Small mobile */
  @media (max-width: 480px) {
    min-width: 100%;
    gap: 6px;
  }

  :deep(.select-wrapper) {
    width: 100%;
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
}
</style>
