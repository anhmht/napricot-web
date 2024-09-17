<template>
  <div class="table">
    <div class="skeleton">
      <el-skeleton animated>
        <template #template>
          <el-skeleton-item v-for="item in 8" :key="item" variant="h1" />
        </template>
      </el-skeleton>
    </div>
    <div class="paging">
      <el-skeleton animated>
        <template #template>
          <div class="paging-items">
            <el-skeleton-item variant="p" style="width: 100px" />
            <el-skeleton-item variant="p" style="width: 300px" />
            <el-skeleton-item variant="p" style="width: 200px" />
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 175px);
}
.skeleton {
  padding: 16px;
  border: 1px solid var(--color-background-grayscale-100);
  border-radius: 8px;
  .el-skeleton__h1 {
    height: 70px;
  }
}
.paging-items {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--color-background-grayscale-50);
  padding: 16px 0;
  .el-skeleton__p {
    height: 44px;
  }
}
</style>
