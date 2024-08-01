<template>
  <div :class="$style.link">
    <div :class="$style.anchor">
      <NuxtLink to="/sign-in"> Hot offers </NuxtLink>
      <NuxtLink to="/tracking"> Sales </NuxtLink>
      <NuxtLink to="/tracking"> Trends </NuxtLink>
      <NuxtLink to="/tracking"> Best seller </NuxtLink>
      <NuxtLink to="/tracking"> New arrival </NuxtLink>
    </div>
    <layout-language />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module>
.link {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 0;
  justify-content: space-between;
}
.anchor {
  display: flex;
  gap: 24px;
  a {
    text-decoration: none;
    color: var(--color-text);
    font-weight: 700;
    font-size: 1.6rem;
    display: flex;
    &:hover,
    :hover {
      color: var(--color-primary);
    }
  }
}
</style>
