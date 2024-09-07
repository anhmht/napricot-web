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
      background-color: var(--color-background-grayscale-50);
      border-radius: 12px;
      transition: all 0.3s ease;
      &:focus-within {
        background-color: #fff;
      }
    }
    :global(.el-input__inner) {
      font-size: 1.6rem;
      &::placeholder {
        color: var(--color-icon);
      }
    }
    :global(.el-input__prefix) {
      span {
        font-size: 2rem;
        color: var(--color-icon);
      }
    }
  }
}
.content {
  flex: 1;
  min-width: calc(100vw - 248px);
}
</style>
