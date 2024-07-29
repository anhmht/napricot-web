<template>
  <div :class="$style.category">
    <div :class="$style.title">
      <i class="icon-menu"></i>
      Categories
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.category {
  position: relative;
}
.title {
  i {
    margin-right: 8px;
    font-size: 2rem;
  }
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
}
</style>
