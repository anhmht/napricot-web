<template>
  <div class="category">
    <CustomPopover
      :width="240"
      placement="bottom-start"
      :append-to-body="false"
      :show-arrow="false"
      :offset="17"
      trigger="hover"
      popperClass="custom-category-popover"
      @before-enter="store.displayOverlay()"
      @before-leave="store.displayOverlay()"
    >
      <layout-header-category-list />
      <template #reference>
        <div :class="['title', store.showOverlay && 'active']">
          <i class="icon-menu"></i>
          Categories
        </div>
      </template>
    </CustomPopover>
  </div>
</template>

<script setup lang="ts">
import CustomPopover from '../custom/popover/index.vue'

const store = useMainStore()
</script>

<style lang="postcss" scoped>
.category {
  position: relative;
  display: flex;

  :deep(.popover-trigger) {
    height: 100% !important;
    align-content: center !important;
  }
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

<!-- Global styles for teleported popover -->
<style lang="postcss">
.custom-category-popover {
  box-shadow: none !important;
  border: none !important;
  border-radius: 0 !important;
}

.custom-category-popover .popover__content {
  padding: 0 !important;
}
</style>
