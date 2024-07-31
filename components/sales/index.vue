<template>
  <div :class="$style.sales">
    <NuxtLink to="#" v-for="item in data">
      <NuxtPicture
        format="webp"
        loading="lazy"
        :src="item.src"
        :alt="item.alt"
        width="330"
        height="330"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const data = ref([
  {
    src: 'images/sales/sale-1.png',
    alt: 'Napricot Sales',
    width: 330,
    height: 330
  },
  {
    src: 'images/sales/sale-2.png',
    alt: 'Napricot Sales',
    width: 330,
    height: 330
  },
  {
    src: 'images/sales/sale-3.png',
    alt: 'Napricot Sales',
    width: 330,
    height: 330
  },
  {
    src: 'images/sales/sale-4.png',
    alt: 'Napricot Sales',
    width: 330,
    height: 330
  }
])
</script>

<style lang="postcss" module>
.sales {
  position: relative;
  display: flex;
  justify-content: space-between;
  a:hover {
    opacity: 0.8;
  }
  picture {
    display: flex;
  }
}
</style>
