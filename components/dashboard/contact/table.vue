<template>
  <div :class="$style.contactTable">
    <custom-table
      :data="contacts"
      :page="pagination.page"
      :limit="pagination.limit"
      :total="list?.total"
      @selection-change="emit('update:selectedRows', $event)"
      @current-change="updateCurrentPage"
      @limit-change="updateLimit"
    >
      <el-table-column
        prop="name"
        label="Name"
        width="200"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <div :class="row.isRead ? $style.read : $style.unread">
            {{ row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email" width="250">
        <template #default="{ row }">
          <div :class="row.isRead ? $style.read : $style.unread">
            {{ row.email }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="Type" width="200">
        <template #default="{ row }">
          <div :class="row.isRead ? $style.read : $style.unread">
            {{ row.type }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="subject" label="Subject" width="300">
        <template #default="{ row }">
          <div :class="row.isRead ? $style.read : $style.unread">
            {{ row.subject }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isDone" label="Status" width="120">
        <template #default="{ row }">
          <el-tag size="large" :type="getStatus(row)" effect="dark">
            {{ getStatusMessage(row) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Create" width="120">
        <template #default="{ row }">
          <div :class="row.isRead ? $style.read : $style.unread">
            {{ fromNow(row.createdAt) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Action" width="220">
        <template #default="{ row }">
          <div :class="$style.action">
            <custom-button type="default" @click="emit('preview', row._id)">
              <i class="icon-eye"></i>
            </custom-button>
            <custom-button type="default" @click="emit('update', row._id)">
              <i class="icon-done"></i>
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
    type: Object as () => ListContacts | null,
    required: true
  },
  pagination: {
    type: Object as () => Pagination,
    required: true
  },
  selectedRows: {
    type: Array as () => Contact[],
    default: []
  }
})

const emit = defineEmits([
  'update:pagination',
  'preview',
  'update',
  'update:selectedRows'
])

const contacts = computed(() => props.list?.contacts || [])

const getStatus = (contact: Contact) => {
  if (contact.isDone) return 'success'

  if (contact.isRead) return 'warning'

  return 'primary'
}

const getStatusMessage = (contact: Contact) => {
  if (contact.isDone) return 'Done'

  if (contact.isRead) return 'In Progress'

  return 'New'
}

const updateCurrentPage = (page: number) => {
  emit('update:pagination', { ...props.pagination, page })
}

const updateLimit = (limit: number) => {
  emit('update:pagination', { ...props.pagination, limit, page: 1 })
}
</script>

<style lang="postcss" module>
.contactTable {
  position: relative;
  .read {
    color: #b5b5b5;
  }
  .unread {
    font-weight: 600;
  }
}
.action {
  display: flex;
  gap: 16px;
}
</style>
