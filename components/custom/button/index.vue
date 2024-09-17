<template>
  <div :class="$style.button">
    <el-button v-bind="$attrs" :type="type" @click="$emit('click')">
      <slot />
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String as () =>
      | ''
      | 'default'
      | 'primary'
      | 'text'
      | 'success'
      | 'warning'
      | 'info'
      | 'danger',
    default: 'primary'
  }
})
defineEmits(['click'])
</script>

<style lang="postcss" module>
.button {
  position: relative;
  button {
    width: 100%;
    padding: 0 24px;
    height: 48px;
    border-radius: 2px;
    span {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 48px;
    }
    i {
      margin-left: 8px;
    }
  }
  :global(.el-button--primary) {
    --el-color-primary-light-5: var(--color-bg-disabled);
    --el-button-disabled-text-color: var(--color-icon);
    --el-button-disabled-border-color: var(--color-bg-disabled);
  }
  :global(.el-button) {
    --el-button-disabled-bg-color: var(--color-bg-disabled);
    --el-button-disabled-border-color: var(--color-bg-disabled);
  }
}
:global(.dashboard) {
  button {
    border-radius: 12px;
    height: 52px;
    span {
      font-weight: 400;
      display: flex;
      gap: 8px;
      i {
        margin: 0;
      }
    }
  }
}
</style>
