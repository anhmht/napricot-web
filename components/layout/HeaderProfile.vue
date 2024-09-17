<template>
  <div :class="$style.profile">
    <div :class="$style.link">
      <NuxtLink v-show="!currentUser" to="/sign-in"> Sign in </NuxtLink>
      <NuxtLink v-show="currentUser" to="/tracking"> Tracking </NuxtLink>
    </div>
    <div :class="$style.icon">
      <NuxtLink to="/favorite" aria-label="Wishlist">
        <i class="icon-favorite"></i>
      </NuxtLink>
      <NuxtLink to="/cart" aria-label="Cart">
        <i class="icon-shopping-cart"></i>
      </NuxtLink>
      <NuxtLink
        v-show="currentUser"
        to="#"
        ref="buttonRef"
        v-click-outside="onClickOutside"
      >
        <i class="icon-person"></i>
      </NuxtLink>
      <el-popover
        ref="popoverRef"
        :virtual-ref="buttonRef"
        trigger="click"
        placement="bottom-end"
        :show-arrow="false"
        virtual-triggering
        :teleported="false"
        :width="200"
      >
        <layout-header-account @close="popoverRef.hide()" />
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from 'element-plus'

const buttonRef = ref()
const popoverRef = ref()

const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
const store = useMainStore()
const currentUser = computed(() => store.currentUser)
</script>

<style lang="postcss" module>
.profile {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  a {
    text-decoration: none;
    color: var(--color-text);
    font-weight: 400;
    font-size: 1.6rem;
    display: flex;
    &:hover,
    :hover {
      color: var(--color-primary);
    }
  }
}
.link {
  display: flex;
  gap: 16px;
}
.icon {
  display: flex;
  gap: 24px;
  i {
    font-size: 2rem;
    color: var(--color-icon);
  }
}
:global(.el-popover.el-popper) {
  padding: 0;
}
</style>
