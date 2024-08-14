<template>
  <div :class="$style.categoryList">
    <ul>
      <li
        v-for="(item, index) in categories"
        :key="index"
        @mouseover="handleMouseOver(index)"
        :class="active === index && $style.active"
      >
        {{ item.name }}
      </li>
    </ul>
    <Transition name="el-zoom-in-left">
      <layout-category-sub-menu v-if="show" :categories="category?.children!" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const store = useMainStore()
const categories = computed(() => store.categories?.treeCategories)

const active = ref<Number | undefined>(undefined)
const show = ref(false)
const category = ref<Category | undefined>(categories.value?.[0])

const handleMouseOver = (index: number) => {
  active.value = index
  category.value = categories.value?.[index]
  show.value = true
}
</script>

<style lang="postcss" module>
.categoryList {
  position: relative;
  padding: 12px 0;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
  li {
    padding: 8px 16px;
    font-weight: 500;
    cursor: pointer;
    &.active {
      background: var(--color-background);
    }
  }
}
</style>
