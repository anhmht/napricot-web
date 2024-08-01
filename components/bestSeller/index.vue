<template>
  <div :class="$style.bestSeller">
    <div :class="$style.title">
      <h4>Best Sellers</h4>
      <NuxtLink to="#"
        >See all
        <i class="icon-arrow-down"></i>
      </NuxtLink>
    </div>
    <div :class="$style.content">
      <product-item
        v-for="item in bestSeller"
        best-selling
        :key="item.id"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="postcss" module scoped>
.bestSeller {
  position: relative;
  padding: 36px 0;
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
    display: flex;
    align-items: baseline;
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
  justify-content: space-evenly;
}
</style>
