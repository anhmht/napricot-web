<template>
  <div :class="$style.categories">
    <layout-dashboard-header title="Categories">
      <template #action>
        <custom-button
          type="danger"
          :disabled="!selectedRows.length"
          @click="handleDelete(selectedRows.map((c) => c._id!))"
        >
          <i class="icon-delete"></i>
          Delete</custom-button
        >
        <custom-button type="primary" @click="handleEdit">
          <i class="icon-add"></i>
          Add Category</custom-button
        >
      </template>
    </layout-dashboard-header>
    <div :class="$style.content" v-loading="status === 'pending'">
      <layout-dashboard-filter
        search-name="Categories"
        @search="search"
        @sort="handleSort"
      />
      <dashboard-category-table
        :list="data"
        v-model:pagination="pagination"
        v-model:selected-rows="selectedRows"
        @edit="handleEdit"
        @delete="handleDelete([$event])"
      />
    </div>

    <custom-modal v-model:open="isOpen" :title="title" :loading="isLoading">
      <dashboard-category-form
        v-loading="isLoading"
        @submit-success="reloadList"
        v-model:loading="isLoading"
        :id="currentId"
      />
    </custom-modal>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'

definePageMeta({
  layout: 'dashboard',
  middleware: 'authorize'
})

/** Table ref */
const selectedRows = ref<ICategory[]>([])

/** Modal ref */
const isOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const title = ref<string>('Add Category')
const currentId = ref<string | undefined>(undefined)

/** Filter and pagination */
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

const handleEdit = (id?: string) => {
  isOpen.value = true
  title.value = id ? 'Edit Category' : 'Add Category'
  currentId.value = id
}

const handleDelete = async (ids: string[]) => {
  ElMessageBox.confirm('Do you want to delete this category?', 'Confirm', {
    type: 'warning',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        await $categoryService.deleteCategories(ids)
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
  isOpen.value = false
  refresh()
}

const { data, status, refresh } = await useAsyncData(
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
