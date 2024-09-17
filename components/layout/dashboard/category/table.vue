<template>
  <div :class="$style.categoryTable">
    <custom-table
      :data="categories"
      :page="pagination.page"
      :limit="pagination.limit"
      :total="list?.total"
      @current-change="updateCurrentPage"
      @limit-change="updateLimit"
    >
      <el-table-column
        prop="name"
        label="Name"
        width="300"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="desc" label="Description" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="slug" label="Slug" width="200"> </el-table-column>
      <el-table-column prop="type" label="Type" width="200">
        <template #default="{ row }">
          <el-tag
            size="large"
            :type="row.type === CategoryType.Product ? 'success' : 'warning'"
            effect="dark"
          >
            {{ row.type }}
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
    type: Object as () => ListCategories | null,
    required: true
  },
  pagination: {
    type: Object as () => Pagination,
    required: true
  }
})

const emit = defineEmits(['update:pagination', 'edit', 'delete'])

const categories = computed(() => props.list?.categories || [])

const updateCurrentPage = (page: number) => {
  emit('update:pagination', { ...props.pagination, page })
}

const updateLimit = (limit: number) => {
  emit('update:pagination', { ...props.pagination, limit, page: 1 })
}
</script>

<style lang="postcss" module>
.categoryTable {
  position: relative;
}
.action {
  display: flex;
  gap: 16px;
}
</style>
