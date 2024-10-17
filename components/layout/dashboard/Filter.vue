<template>
  <div :class="$style.filter">
    <el-input
      :class="$style.input"
      v-model="query"
      :placeholder="`Search ${searchName}`"
      @input="emit('search', $event)"
    >
      <template #prefix>
        <i class="icon-search"></i>
      </template>
    </el-input>
    <div :class="$style.action">
      <custom-button @click="handleClear" type="default">
        <i class="icon-filter-3-fill"></i>
        Show all {{ searchName }}
      </custom-button>
      <el-dropdown
        :teleported="false"
        :class="$style.dropdown"
        @command="handleCommand"
      >
        <custom-button type="default">
          <i class="icon-filter"></i>
          {{ sort }}
        </custom-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="createdAt"
              >Sort by default</el-dropdown-item
            >
            <el-dropdown-item command="updatedAt"
              >Sort by last update</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  searchName: {
    type: String,
    default: ''
  }
})
const query = ref('')
const sort = ref('Sort by default')

const emit = defineEmits(['search', 'sort'])

const handleClear = () => {
  query.value = ''
  emit('search', '')
}

const handleCommand = (command: string) => {
  sort.value =
    command === 'createdAt' ? 'Sort by default' : 'Sort by last update'
  emit('sort', command)
}
</script>

<style lang="postcss" module>
.filter {
  position: relative;
  height: 48px;
  display: flex;
  gap: 64px;
  justify-content: space-between;
}
.action {
  display: flex;
  gap: 16px;
}
.dropdown {
  font-weight: 400;
}
</style>
