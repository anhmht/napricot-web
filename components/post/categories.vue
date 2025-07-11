<template>
  <div :class="$style.categories">
    <div :class="$style.title">Categories</div>
    <ul :class="$style.list">
      <li v-for="category in categories" :key="category._id">
        <nuxt-link :to="`#`">
          {{ category.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const store = useMainStore()

const categories = computed(() => store.getCategories(CategoryType.Post))
</script>

<style lang="postcss" module>
.categories {
  position: relative;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}
.title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
  li + li {
    margin-top: 12px;
  }
  a {
    color: var(--color-text);
    font-size: 1.6rem;
    font-weight: 400;
    text-decoration: none;
    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
