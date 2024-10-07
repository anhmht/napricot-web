<template>
  <div :class="$style.searchInput">
    <div :class="$style.title">Search</div>
    <el-input :class="$style.input" v-model="search" placeholder="Search...">
      <template #suffix>
        <i class="icon-search"></i>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
const search = ref('')
</script>

<style lang="postcss" module>
.searchInput {
  position: relative;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  :global(.el-input__wrapper) {
    padding: 8px 16px;
  }
}
.title {
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
