<template>
  <div id="trending" :class="$style.trending">
    <div :class="$style.title">
      <h4>Trending</h4>
      <NuxtLink to="#"
        >See all
        <i class="icon-arrow-down"></i>
      </NuxtLink>
    </div>
    <div :class="$style.content">
      <product-item
        v-for="item in trending(config)"
        :key="item.id"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { trending } from '~/data/Trending'
const config = useRuntimeConfig()
</script>

<style lang="postcss" module scoped>
.trending {
  display: block;
  scroll-margin-top: 150px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-weight: 700;
  }
  a {
    font-size: 1.6rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    gap: 4px;
    i {
      font-size: 1.2rem;
      transform: rotate(-90deg);
      color: var(--color-icon);
    }
    &:hover {
      color: var(--color-primary);
      i {
        color: var(--color-primary);
      }
    }
  }
}
.content {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .trending {
    padding: 0 16px;
  }
  .content {
    gap: 16px;
  }
}
</style>
