<template>
  <div :class="$style.table">
    <client-only>
      <el-table
        :data="props.data"
        style="width: 100%"
        :class="$style.elTable"
        table-layout="auto"
        :height="height"
        scrollbar-always-on
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <slot />
      </el-table>
      <div :class="$style.pagination">
        <div :class="$style.display">
          Page {{ page }} of {{ Math.ceil(total / limit) }}
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :default-current-page="1"
          :page-size="limit"
          :current-page="page"
          :total="total"
          @current-change="emit('current-change', $event)"
        />
        <div :class="$style.limit">
          <el-select
            v-model="pageSize"
            placeholder="Select"
            size="large"
            style="width: 170px"
            @change="emit('limit-change', $event)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :class="$style.option"
            />
          </el-select>
        </div>
      </div>
      <template #fallback>
        <custom-table-loading />
      </template>
    </client-only>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array as () => any[],
    required: true
  },
  height: {
    type: String,
    default: '650'
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['current-change', 'limit-change', 'selection-change'])

const options = [
  { value: 10, label: '10 rows per page' },
  { value: 20, label: '20 rows per page' },
  { value: 50, label: '50 rows per page' },
  { value: 100, label: '100 rows per page' }
]

const pageSize = ref(props.limit)

const handleSelectionChange = (rows: any[]) => {
  emit('selection-change', rows)
}
</script>

<style lang="postcss" module>
.table {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 175px);
}
.elTable {
  width: 100%;
  border: 1px solid var(--color-background-grayscale-100);
  border-radius: 8px;
  :global(.el-table__body-header .el-table__cell) {
    background-color: var(--color-grayscale-25);
    padding: 12px 16px;
    :global(.cell) {
      padding: 0;
      color: var(--color-grayscale-900);
      font-size: 1.8rem;
      font-weight: 700;
    }
  }
  :global(.el-table__body .el-table__row) {
    :global(.el-table__cell) {
      color: var(--color-grayscale-900);
      padding: 0;
      :global(.cell) {
        padding: 14px 16px;
        font-size: 1.6rem;
        font-weight: 400;
        button {
          height: 42px;
          padding: 0 16px;
          i {
            margin: 0;
          }
        }
      }
    }
  }
}
.pagination {
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: space-between;
  border-top: 1px solid var(--color-background-grayscale-50);
  padding: 16px 0;
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
.option {
  font-weight: 400;
}
</style>
