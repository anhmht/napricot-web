<template>
  <div :class="$style.header">
    <div :class="$style.title">
      <slot name="prefix" />
      <h4>{{ title }}</h4>
    </div>
    <div :class="$style.action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style lang="postcss" module>
.header {
  display: flex;
  padding: 12px 32px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-background-grayscale-100);
}
.title {
  display: flex;
  align-items: center;
  gap: 16px;
  h4 {
    font-size: 2.4rem;
    font-weight: 500;
  }
}
.action {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
