<template>
  <div :class="$style.admin">
    <div :class="$style.header" @click="toggle">
      <div :class="$style.avatar">
        <NuxtImg src="images/Avatar-admin.svg" width="40" height="40" />
      </div>
      <div :class="$style.info">
        <div>Admin</div>
        <span>support@napricot.com</span>
      </div>
      <div :class="[$style.arrow, isOpen && $style.rotate]">
        <i class="icon-arrow-down"></i>
      </div>
    </div>
    <div :class="[$style.content, isOpen && $style.open]">
      <nuxt-link to="/dashboard/setting" :class="$style.item">
        <i class="icon-settings"></i>
        <span>Settings</span>
      </nuxt-link>
      <div :class="$style.item" @click="handleSignOut">
        <i class="icon-logout-circle"></i>
        <span>Log out</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
}

const handleSignOut = async () => {
  const { signOut } = useAuth()
  await signOut()
  navigateTo('/')
}
</script>

<style lang="postcss" module>
.admin {
  position: absolute;
  bottom: 16px;
  left: 12px;
  right: 12px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid var(--color-background-grayscale-100);
  box-shadow: 0px 16px 32px -12px rgba(7, 32, 69, 0.25);
}
.header {
  display: flex;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-background-grayscale-100);
  align-items: center;
  cursor: pointer;
}
.avatar {
  margin-right: 12px;
  display: flex;
}
.info {
  display: flex;
  flex-direction: column;
  flex: 1;
  div {
    font-weight: 700;
    font-size: 1.4rem;
  }
  span {
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--color-text-grayscale-400);
  }
  &:hover {
    div {
      color: var(--color-primary);
    }
  }
}
.arrow {
  display: flex;
  transition: all 0.3s ease;
  &.rotate {
    transform: rotate(180deg);
  }
}
.content {
  padding: 0 12px;
  font-size: 1.4rem;
  font-weight: 450;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  &.open {
    max-height: 200px;
    padding: 8px 12px;
  }
}
.item {
  color: var(--color-text-grayscale-500);
  text-decoration: none;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  i {
    margin-right: 12px;
    font-size: 2rem;
  }
  &:hover {
    color: var(--color-primary);
  }
}
</style>
