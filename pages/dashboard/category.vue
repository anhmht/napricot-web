<template>
  <div :class="$style.categories">
    <layout-dashboard-header title="Categories">
      <template #action>
        <custom-button type="primary" @click="isOpen = true">
          <i class="icon-add"></i>
          Add ICategory</custom-button
        >
      </template>
    </layout-dashboard-header>
    <div :class="$style.content" v-loading="status === 'pending'">
      <layout-dashboard-category-filter @search="search" @sort="handleSort" />
      <layout-dashboard-category-table
        :list="data"
        v-model:pagination="pagination"
        @edit="isOpen = true"
      />
    </div>

    <custom-modal v-model:open="isOpen" :title="title">
      <layout-dashboard-category-form />
    </custom-modal>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'

definePageMeta({
  layout: 'dashboard'
})

const isOpen = ref<boolean>(false)
const title = ref<string>('Add ICategory')

const filter = ref<CategoryFilter>({
  name: '',
  sort: ''
})

const pagination = ref<Pagination>({
  page: 1,
  limit: 10
})

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

const { data, status } = await useAsyncData(
  'category',
  async () => {
    return await $categoryService.getCategories(filter.value, pagination.value)
  },
  {
    watch: [filter, pagination]
  }
)
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
