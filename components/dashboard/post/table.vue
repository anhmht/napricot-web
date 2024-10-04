<template>
  <div :class="$style.categoryTable">
    <custom-table
      :data="posts"
      :page="pagination.page"
      :limit="pagination.limit"
      :total="list?.total"
      :selected-rows="selectedRows"
      @selection-change="emit('update:selectedRows', $event)"
      @current-change="updateCurrentPage"
      @limit-change="updateLimit"
    >
      <el-table-column
        prop="title"
        label="Title"
        width="450"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <div :class="$style.image">
            <NuxtImg :src="imageUrl(row.image)" width="64" height="64" />
            <span>{{ row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="categoryId" label="Category" width="350">
        <template #default="{ row }">
          {{ getCategoryName(row.categoryId) }}
        </template>
      </el-table-column>
      <el-table-column prop="slug" label="Slug" width="200"> </el-table-column>
      <el-table-column prop="type" label="Type" width="200">
        <template #default="{ row }">
          <el-tag
            size="large"
            :type="row.status === PostStatus.published ? 'success' : 'warning'"
            effect="dark"
          >
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Action" width="220">
        <template #default="{ row }">
          <div :class="$style.action">
            <custom-button type="default" @click="emit('edit', row._id)">
              <i class="icon-edit"></i>
              Edit
            </custom-button>
            <custom-button type="danger" @click="emit('delete', row._id)">
              <i class="icon-delete"></i>
            </custom-button>
          </div>
        </template>
      </el-table-column>
    </custom-table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  list: {
    type: Object as () => ListPosts | null,
    required: true
  },
  pagination: {
    type: Object as () => Pagination,
    required: true
  },
  selectedRows: {
    type: Array as () => IPost[],
    default: []
  }
})

const emit = defineEmits([
  'update:pagination',
  'edit',
  'delete',
  'update:selectedRows'
])

const categories = ref<ICategory[]>([])

const posts = computed(() => props.list?.posts || [])

const imageUrl = (image: Image) => {
  return image?.cloudflareUrl ? image?.cloudflareUrl + 'avatar176' : image?.url
}

const updateCurrentPage = (page: number) => {
  emit('update:pagination', { ...props.pagination, page })
}

const updateLimit = (limit: number) => {
  emit('update:pagination', { ...props.pagination, limit, page: 1 })
}

const getCategoryName = (id: string): string => {
  return categories.value.find((category) => category._id === id)?.name || ''
}

onMounted(async () => {
  categories.value = (await $categoryService.getAllCategories()).categories
})
</script>

<style lang="postcss" module>
.categoryTable {
  position: relative;
}
.action {
  display: flex;
  gap: 16px;
}
.image {
  display: flex;
  gap: 16px;
  align-items: center;
  img {
    object-fit: cover;
  }
  span {
    white-space: break-spaces;
  }
}
</style>
