<template>
  <div :class="$style.link">
    <div :class="$style.anchor">
      <NuxtLink to="/sign-in"> Hot offers </NuxtLink>
      <NuxtLink to="/tracking"> Sales </NuxtLink>
      <NuxtLink to="/tracking"> Trends </NuxtLink>
      <NuxtLink to="/tracking"> Best seller </NuxtLink>
      <NuxtLink to="/tracking"> New arrival </NuxtLink>
    </div>
    <div :class="$style.lang">
      <span><i class="icon-global" /> United State</span>
      <span>
        <NuxtPicture
          src="/images/usa-flag.webp"
          alt="United State"
          width="24"
          height="24"
        />
        English (EN-US)
      </span>
      <span> $ (USD) </span>
    </div>
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
.lang {
  display: flex;
  align-items: center;
  padding: 4px 16px;
  gap: 24px;
  border-radius: 64px;
  background-color: var(--color-background);
  span {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 400;
    gap: 4px;
  }
  picture {
    display: flex;
  }
  i {
    font-size: 2.4rem;
    color: var(--color-icon);
  }
}
</style>
