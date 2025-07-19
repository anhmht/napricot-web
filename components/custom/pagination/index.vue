<template>
  <div class="pagination" v-if="total > 0 && totalPages > 0">
    <!-- Total count display -->
    <div v-if="showTotal" class="pagination__total">
      {{ totalText }}
    </div>

    <!-- Page size selector -->
    <div v-if="showSizeChanger" class="pagination__size-selector">
      <select
        :value="currentPageSize"
        @change="handlePageSizeChange"
        class="pagination__size-select"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }} / page
        </option>
      </select>
    </div>

    <div class="pagination__controls">
      <!-- Previous button -->
      <button
        class="pagination__btn pagination__btn--prev"
        :disabled="currentPage <= 1"
        @click="handlePrevious"
        type="button"
      >
        <span class="pagination__btn-icon">
          <i class="icon-arrow-down" />
        </span>
        <span v-if="showPrevNext" class="pagination__btn-text">Previous</span>
      </button>

      <!-- First page button -->
      <button
        v-if="showFirstLast && currentPage > 3"
        class="pagination__btn pagination__btn--page"
        @click="handlePageChange(1)"
        type="button"
      >
        1
      </button>

      <!-- First ellipsis -->
      <span
        v-if="showFirstLast && currentPage > 4"
        class="pagination__ellipsis"
      >
        ...
      </span>

      <!-- Page number buttons -->
      <button
        v-for="page in visiblePages"
        :key="page"
        class="pagination__btn pagination__btn--page"
        :class="{ 'pagination__btn--active': page === currentPage }"
        @click="handlePageChange(page)"
        type="button"
      >
        {{ page }}
      </button>

      <!-- Last ellipsis -->
      <span
        v-if="showFirstLast && currentPage < totalPages - 3"
        class="pagination__ellipsis"
      >
        ...
      </span>

      <!-- Last page button -->
      <button
        v-if="showFirstLast && currentPage < totalPages - 2"
        class="pagination__btn pagination__btn--page"
        @click="handlePageChange(totalPages)"
        type="button"
      >
        {{ totalPages }}
      </button>

      <!-- Next button -->
      <button
        class="pagination__btn pagination__btn--next"
        :disabled="currentPage >= totalPages"
        @click="handleNext"
        type="button"
      >
        <span v-if="showPrevNext" class="pagination__btn-text">Next</span>
        <span class="pagination__btn-icon">
          <i class="icon-arrow-down" />
        </span>
      </button>
    </div>

    <!-- Quick jumper -->
    <div v-if="showQuickJumper" class="pagination__jumper">
      <span class="pagination__jumper-text">Go to</span>
      <input
        v-model.number="jumpPage"
        @keyup.enter="handleJump"
        @blur="handleJump"
        class="pagination__jumper-input"
        type="number"
        :min="1"
        :max="totalPages"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  // Current page number
  modelValue: number
  // Total number of items
  total: number
  // Number of items per page
  pageSize?: number
  // Available page sizes
  pageSizes?: number[]
  // Number of visible page buttons
  pagerCount?: number
  // Show total count
  showTotal?: boolean
  // Show page size selector
  showSizeChanger?: boolean
  // Show quick jumper
  showQuickJumper?: boolean
  // Show first/last page buttons
  showFirstLast?: boolean
  // Show prev/next text
  showPrevNext?: boolean
  // Custom total text function
  totalFormat?: (total: number, range: [number, number]) => string
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  pagerCount: 7,
  showTotal: true,
  showSizeChanger: false,
  showQuickJumper: false,
  showFirstLast: true,
  showPrevNext: false,
  totalFormat: undefined
})

const emit = defineEmits<{
  'update:modelValue': [page: number]
  change: [page: number]
  'size-change': [size: number]
}>()

const currentPage = computed(() => props.modelValue)
const currentPageSize = ref(props.pageSize)
const jumpPage = ref<number | null>(null)

// Calculate total pages
const totalPages = computed(() => {
  if (!props.total || !currentPageSize.value) return 0
  return Math.ceil(props.total / currentPageSize.value)
})

// Calculate visible page numbers
const visiblePages = computed(() => {
  const pages: number[] = []
  const pagerCount = props.pagerCount
  const current = currentPage.value
  const total = totalPages.value

  let start = Math.max(1, current - Math.floor(pagerCount / 2))
  let end = Math.min(total, start + pagerCount - 1)

  if (end - start + 1 < pagerCount) {
    start = Math.max(1, end - pagerCount + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Calculate total text
const totalText = computed(() => {
  const start = (currentPage.value - 1) * currentPageSize.value + 1
  const end = Math.min(currentPage.value * currentPageSize.value, props.total)

  if (props.totalFormat) {
    return props.totalFormat(props.total, [start, end])
  }

  return `${start}-${end} of ${props.total} items`
})

// Handle page change
const handlePageChange = (page: number) => {
  if (page !== currentPage.value && page >= 1 && page <= totalPages.value) {
    emit('update:modelValue', page)
    emit('change', page)
  }
}

// Handle previous page
const handlePrevious = () => {
  if (currentPage.value > 1) {
    handlePageChange(currentPage.value - 1)
  }
}

// Handle next page
const handleNext = () => {
  if (currentPage.value < totalPages.value) {
    handlePageChange(currentPage.value + 1)
  }
}

// Handle page size change
const handlePageSizeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newSize = parseInt(target.value)
  currentPageSize.value = newSize
  emit('size-change', newSize)

  // Adjust current page if necessary
  const newTotalPages = Math.ceil(props.total / newSize)
  if (currentPage.value > newTotalPages) {
    handlePageChange(newTotalPages)
  }
}

// Handle quick jump
const handleJump = () => {
  if (
    jumpPage.value &&
    jumpPage.value >= 1 &&
    jumpPage.value <= totalPages.value
  ) {
    handlePageChange(jumpPage.value)
    jumpPage.value = null
  }
}

// Watch for page size prop changes
watch(
  () => props.pageSize,
  (newSize) => {
    if (newSize) {
      currentPageSize.value = newSize
    }
  },
  { immediate: true }
)

// Ensure proper SSR hydration
onMounted(() => {
  if (props.pageSize && currentPageSize.value !== props.pageSize) {
    currentPageSize.value = props.pageSize
  }
})
</script>

<style lang="postcss" scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  font-family: 'SVN-Circular', sans-serif;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination__total {
  color: var(--color-grayscale-70);
  font-size: 1.4rem;
  font-weight: 400;
}

.pagination__size-selector {
  display: flex;
  align-items: center;
}

.pagination__size-select {
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grayscale-40);
  border-radius: 4px;
  font-size: 1.4rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.pagination__size-select:hover {
  border-color: var(--color-primary);
}

.pagination__size-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(236, 88, 37, 0.1);
}

.pagination__controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.pagination__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 4rem;
  width: 4rem;
  height: 4rem;
  padding: 0;
  border: 1px solid var(--color-background-grayscale-100);
  background: white;
  color: var(--color-text);
  font-size: 1.4rem;
  font-weight: 400;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 0.4rem;
  /* Ensure proper touch targets */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.pagination__btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.pagination__btn:disabled {
  cursor: not-allowed;
  color: var(--color-grayscale-60);
  background: var(--color-grayscale-20);
  border-color: var(--color-grayscale-30);
}

.pagination__btn--active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.pagination__btn--active:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
  color: white;
}

.pagination__btn--prev,
.pagination__btn--next {
  min-width: 4rem;
  width: 4rem;
  padding: 0;
}

.pagination__btn-icon {
  font-size: 1rem;
  line-height: 1;
  font-weight: 700;
}

.pagination__btn--prev .pagination__btn-icon {
  transform: rotate(90deg);
}

.pagination__btn--next .pagination__btn-icon {
  transform: rotate(-90deg);
}

.pagination__btn-text {
  font-size: 1.4rem;
}

.pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.2rem;
  height: 3.2rem;
  color: var(--color-grayscale-60);
  font-size: 1.4rem;
}

.pagination__jumper {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.pagination__jumper-text {
  color: var(--color-grayscale-70);
  font-size: 1.4rem;
}

.pagination__jumper-input {
  width: 6rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-grayscale-40);
  border-radius: 4px;
  font-size: 1.4rem;
  text-align: center;
  transition: border-color 0.2s ease;
}

.pagination__jumper-input:hover {
  border-color: var(--color-primary);
}

.pagination__jumper-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(236, 88, 37, 0.1);
}

/* Remove spinner from number input */
.pagination__jumper-input::-webkit-outer-spin-button,
.pagination__jumper-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.pagination__jumper-input[type='number'] {
  -moz-appearance: textfield;
}

/* Responsive design */
@media (max-width: 768px) {
  .pagination {
    gap: 1rem;
    justify-content: center;
  }

  .pagination__controls {
    gap: 0.6rem;
  }

  .pagination__total {
    font-size: 1.2rem;
  }

  .pagination__btn {
    min-width: 3.6rem;
    width: 3.6rem;
    height: 3.6rem;
    font-size: 1.2rem;
  }

  .pagination__btn--prev,
  .pagination__btn--next {
    min-width: 3.6rem;
    width: 3.6rem;
    padding: 0;
  }

  .pagination__btn-icon {
    font-size: 1.2rem;
  }

  .pagination__btn-text {
    display: none;
  }

  .pagination__ellipsis {
    min-width: 2.4rem;
    height: 2.4rem;
    font-size: 1.2rem;
  }

  .pagination__size-select {
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
  }

  .pagination__jumper-text {
    font-size: 1.2rem;
  }

  .pagination__jumper-input {
    width: 5rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .pagination {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }

  .pagination__controls {
    order: 1;
    gap: 0.8rem;
  }

  .pagination__total {
    order: 2;
    text-align: center;
  }

  .pagination__size-selector,
  .pagination__jumper {
    order: 3;
  }

  .pagination__btn {
    min-width: 4rem;
    width: 4rem;
    height: 4rem;
    font-size: 1.4rem;
  }

  .pagination__btn--prev,
  .pagination__btn--next {
    min-width: 4rem;
    width: 4rem;
  }

  .pagination__btn-icon {
    font-size: 1.4rem;
  }

  .pagination__ellipsis {
    min-width: 3.2rem;
    height: 3.2rem;
    font-size: 1.4rem;
  }
}
</style>
