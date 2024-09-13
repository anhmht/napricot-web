<template>
  <div :class="[$style.dashboard, 'dashboard']">
    <layout-sidebar />
    <div :class="$style.content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.dashboard {
  display: flex;
  overflow: hidden;
  :global(.el-input) {
    height: inherit;
    :global(.el-input__wrapper) {
      padding: 1px 16px;
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    :global(.el-input__inner) {
      font-size: 1.4rem;
    }
    :global(.el-input__prefix) {
      span {
        font-size: 2rem;
      }
    }
  }
  :global(.el-select__wrapper) {
    min-height: 44px;
    border-radius: 12px;
  }
  :global(.el-form-item--label-top .el-form-item__label) {
    font-weight: 400;
  }
}
.content {
  flex: 1;
  min-width: calc(100vw - 248px);
}
</style>
