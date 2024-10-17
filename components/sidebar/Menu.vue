<template>
  <div :class="$style.menu">
    <sidebar-menu-item
      v-for="(item, index) in menu"
      :key="index"
      :data="item"
      :is-active="isActive(item)"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isActive = (menu: Menu) => {
  return (
    menu.route === route.path ||
    !!(route.name && menu.activePath?.includes(route.name.toString()))
  )
}
</script>

<style lang="postcss" module>
.menu {
  display: block;
  position: relative;
}
</style>
