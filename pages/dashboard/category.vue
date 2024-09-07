<template>
  <div :class="$style.categories">
    <layout-dashboard-header title="Categories">
      <template #action>
        <custom-button type="primary">
          <i class="icon-add"></i>
          Add Category</custom-button
        >
      </template>
    </layout-dashboard-header>
    <div :class="$style.content" v-loading="status === 'pending'">
      <layout-dashboard-category-filter @search="search" @sort="handleSort" />
      <layout-dashboard-category-table
        :list="data"
        v-model:pagination="pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'

definePageMeta({
  layout: 'dashboard'
})

const pagination = ref<Pagination>({
  page: 1,
  limit: 10
})

const filter = ref<GetCategoryRequest>({
  name: '',
  ...pagination.value
})

const { data, status } = await useAsyncData(
  'category',
  async () => {
    return await $categoryService.getCategories(filter.value)
  },
  {
    watch: [filter],
    deep: false
  }
)

const handleSearch = debounce((query: string) => {
  filter.value.name = query || undefined
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

watchEffect(() => {
  filter.value = {
    ...filter.value,
    page: pagination.value.page,
    limit: pagination.value.limit
  }
})
</script>

<style lang="postcss" module>
.categories {
  display: block;
}
.content {
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
