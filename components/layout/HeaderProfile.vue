<template>
  <div :class="$style.profile">
    <div :class="$style.link">
      <NuxtLink to="/sign-in"> Sign in </NuxtLink>
      <NuxtLink to="/tracking"> Tracking </NuxtLink>
    </div>
    <div :class="$style.icon">
      <NuxtLink to="/favorite">
        <i class="icon-favorite"></i>
      </NuxtLink>
      <NuxtLink to="/cart">
        <i class="icon-shopping-cart"></i>
      </NuxtLink>
      <NuxtLink to="/profile">
        <i class="icon-person"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
</style>
