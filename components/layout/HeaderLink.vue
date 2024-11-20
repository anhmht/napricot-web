<template>
  <div :class="$style.link">
    <div :class="$style.anchor">
      <NuxtLink
        :class="$style.hotOffers"
        :to="{ path: '/', hash: '#hot-offers' }"
      >
        Hot offers
      </NuxtLink>
      <NuxtLink :to="{ path: '/', hash: '#sales' }"> Sales </NuxtLink>
      <NuxtLink :to="{ path: '/', hash: '#trending' }"> Trends </NuxtLink>
      <NuxtLink :to="{ path: '/', hash: '#best-seller' }">
        Best seller
      </NuxtLink>
      <NuxtLink :to="{ path: '/', hash: '#new-arrival' }">
        New arrival
      </NuxtLink>
    </div>
    <layout-language :class="$style.language" />
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
    font-weight: 500;
    font-size: 1.6rem;
    display: flex;
    &:hover {
      color: var(--color-primary);
    }
  }
}
@media (max-width: 768px) {
  .link {
    padding: 12px 16px;
  }
  .hotOffers {
    display: none !important;
  }
  .language {
    display: none;
  }
}
</style>
