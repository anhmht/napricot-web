<template>
  <div :class="$style.profile">
    <div :class="$style.link">
      <NuxtLink v-show="!currentUser" to="/sign-in"> Sign in </NuxtLink>
      <NuxtLink v-show="currentUser" to="#"> Tracking </NuxtLink>
    </div>
    <div :class="$style.iconDesktop">
      <NuxtLink to="#" aria-label="Wishlist">
        <i class="icon-favorite"></i>
      </NuxtLink>
      <NuxtLink to="#" aria-label="Cart">
        <i class="icon-shopping-cart"></i>
      </NuxtLink>
      <CustomPopover
        v-show="currentUser"
        ref="popoverRef"
        trigger="click"
        placement="bottom-end"
        :show-arrow="false"
        :width="200"
        :append-to-body="true"
      >
        <template #reference>
          <NuxtLink to="#" ref="buttonRef" aria-label="User Account">
            <i class="icon-person"></i>
          </NuxtLink>
        </template>
        <layout-header-account @close="popoverRef?.hide()" />
      </CustomPopover>
    </div>
    <div :class="$style.icon">
      <layout-search-icon @search="$emit('search', $event)" />
      <i class="icon-shopping-cart"></i>
      <i class="icon-menu" @click="open = true"></i>
      <layout-category-drawer v-model:open="open" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomPopover from '../custom/popover/index.vue'

defineEmits(['search'])

const buttonRef = ref()
const popoverRef = ref()
const open = ref(false)

const { user } = useAuth()
const currentUser = computed(() => user.value)
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
.iconDesktop {
  display: flex;
  gap: 24px;
  align-items: center;
  i {
    font-size: 2.3rem;
    color: var(--color-icon);
  }
}
.icon {
  display: none;
  gap: 24px;
  align-items: center;
  i {
    font-size: 2.3rem;
    color: var(--color-icon);
  }
}
@media (max-width: 768px) {
  .link {
    display: none;
  }
  .iconDesktop {
    display: none;
  }
  .icon {
    display: flex;
  }
}
</style>
