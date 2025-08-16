<template>
  <div class="author">
    <div class="breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: 'authors', path: '/author' }]" />
      </div>
    </div>
    <div class="container page-container">
      <div class="filter">
        <custom-field
          v-model="searchQuery"
          class="search"
          placeholder="Search authors..."
          @keyup="handleSearchKeyup"
          @input="handleSearchInput"
        >
          <template #suffix>
            <i class="icon-search" @click="handleSearchKeyup" />
          </template>
        </custom-field>
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
        <author-item
          v-for="author in data?.authors"
          :key="author._id"
          :author="author"
        />
      </div>
      <div v-if="data" class="pagination">
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
const filter = ref<AuthorFilter>({
  name: '',
  sort: 'createdAt'
})
const pagination = ref<Pagination>({
  page: 1,
  limit: 15
})

// Search query reactive variable
const searchQuery = ref('')

const sorts = computed<SelectOption[]>(() => {
  return [
    { label: 'Latest Author', value: 'createdAt' },
    { label: 'Last Updated', value: 'updatedAt' }
  ]
})

const handleSearch = debounce((query: string) => {
  filter.value.name = query || undefined
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
  'authors-fetch',
  async () => {
    return await $authorService.getAuthors(filter.value, pagination.value)
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
  title: () => `Authors`,
  description: () =>
    `Discover meaningful content across multiple topics. At Napricot, we share knowledge, creativity, and inspiration — one post at a time.`,
  ogTitle: () => `Authors`,
  ogSiteName: () => 'Napricot Eyelash Beauty',
  ogDescription: () =>
    `Discover meaningful content across multiple topics. At Napricot, we share knowledge, creativity, and inspiration — one post at a time.`
})

useSchemaOrg([
  defineWebPage({
    name: 'Napricot Eyelash Beauty',
    description:
      'Discover meaningful content across multiple topics. At Napricot, we share knowledge, creativity, and inspiration — one post at a time.'
  })
])
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
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
}
.pagination {
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  padding: 24px 0;
}
</style>
