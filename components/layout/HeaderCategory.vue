<template>
  <div :class="$style.category">
    <el-popover
      width="240"
      placement="bottom-start"
      :teleported="false"
      :show-arrow="false"
      popper-class="customPopper"
      transition="el-zoom-in-top"
      :offset="17"
      @before-enter="store.displayOverlay()"
      @before-leave="store.displayOverlay()"
    >
      <layout-header-category-list />
      <template #reference>
        <div :class="[$style.title, store.showOverlay && $style.active]">
          <i class="icon-menu"></i>
          Categories
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
const store = useMainStore()
</script>

<style lang="postcss" module>
.category {
  position: relative;
  display: flex;
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
  cursor: pointer;
  &.active {
    color: var(--color-primary);
  }
}
</style>
<style lang="postcss">
.customPopper {
  &.el-popover.el-popper {
    box-shadow: none;
    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
