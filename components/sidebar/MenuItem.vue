<template>
  <NuxtLink :to="data.route" :class="[$style.item, isActive && $style.active]">
    <div :class="$style.name">
      <i :class="data.icon"></i>
      {{ data.name }}
    </div>
    <div v-if="false" :class="$style.arrow">
      <i class="icon-arrow-down"></i>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object as () => Menu,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="postcss" module>
.item {
  text-decoration: none;
  cursor: pointer;
  display: flex;
  padding: 8px 12px;
  font-size: 1.4rem;
  font-weight: 500;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-grayscale-500);
  i {
    font-size: 2rem;
  }
  &.active {
    color: var(--color-grayscale-900);
    border-radius: 8px;
    border: 1px solid #e4e4e7;
    background: #fff;
    box-shadow: 0px -3px 0px 0px rgba(0, 0, 0, 0.08) inset;
    i {
      color: var(--color-primary);
    }
  }
  &:hover {
    color: var(--color-primary);
  }
}
.item + .item {
  margin-top: 8px;
}
.name {
  display: flex;
  align-items: center;
  i {
    margin-right: 12px;
  }
}
</style>
