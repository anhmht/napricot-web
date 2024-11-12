<template>
  <div :class="$style.linkTable">
    <custom-table
      :data="links"
      :page="pagination.page"
      :limit="pagination.limit"
      :total="list?.total"
      @selection-change="emit('update:selectedRows', $event)"
      @current-change="updateCurrentPage"
      @limit-change="updateLimit"
    >
      <el-table-column
        prop="words"
        label="Words"
        width="300"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="url" label="Path" width="500">
        <template #default="{ row }">
          <nuxt-link :to="row.url" target="_blank">{{ row.url }}</nuxt-link>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Create" width="170">
        <template #default="{ row }">
          {{ fromNow(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="Update" width="170">
        <template #default="{ row }">
          {{ fromNow(row.updatedAt) }}
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
    type: Object as () => ListLinks | null,
    required: true
  },
  pagination: {
    type: Object as () => Pagination,
    required: true
  },
  selectedRows: {
    type: Array as () => ILink[],
    default: []
  }
})

const emit = defineEmits([
  'update:pagination',
  'edit',
  'delete',
  'update:selectedRows'
])

const links = computed(() => props.list?.links || [])

const updateCurrentPage = (page: number) => {
  emit('update:pagination', { ...props.pagination, page })
}

const updateLimit = (limit: number) => {
  emit('update:pagination', { ...props.pagination, limit, page: 1 })
}
</script>

<style lang="postcss" module>
.linkTable {
  position: relative;
}
.action {
  display: flex;
  gap: 16px;
}
</style>
