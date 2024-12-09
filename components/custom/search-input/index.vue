<template>
  <div :class="$style.searchInput">
    <el-input :class="$style.input" v-model="search" placeholder="Search...">
      <template #suffix>
        <i class="icon-search"></i>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search'])
const search = ref<string>('')

watch(search, (value) => {
  emit('search', value)
})
</script>

<style lang="postcss" module>
.searchInput {
  :global(.el-input__wrapper) {
    padding: 8px 16px;
  }
}
</style>
