<template>
  <div :class="$style.main">
    <el-alert v-bind="$attrs" show-icon :closable="false" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.main {
  display: block;
  margin-bottom: 12px;
}
:global {
  .el-alert--error.is-light {
    color: var(--color-error);
    --el-alert-bg-color: #ffe4e4;
  }
}
:global(.el-alert--success) {
  --el-alert-bg-color: #f0fdf4;
}
:global(.el-alert) {
  border: 1px solid;
}
</style>
