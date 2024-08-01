<template>
  <div :class="$style.menu">
    <sidebar-menu-item
      v-for="(item, index) in menu"
      :key="index"
      :data="item"
      :is-active="item.route === route.path"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style lang="postcss" module>
.menu {
  display: block;
  position: relative;
}
</style>
