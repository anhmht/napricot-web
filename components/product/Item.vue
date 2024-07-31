<template>
  <NuxtLink :to="`/product/${data.slug}`" :class="$style.product">
    <NuxtPicture
      format="webp"
      loading="lazy"
      :src="data.image"
      :alt="data.name"
      width="330"
      height="330"
    />
    <p>{{ data.name }}</p>
    <div :class="$style.price">${{ price }}</div>
    <ClientOnly>
      <el-rate v-model="rate" disabled show-score score-template="({value})" />
    </ClientOnly>
  </NuxtLink>
</template>

<script setup lang="ts">
const rate = ref(randomRate(4, 5))
const props = defineProps({
  data: {
    type: Object as () => Product,
    required: true
  }
})

const price = computed(() => props.data.price.toFixed(2))
</script>

<style lang="postcss" module scoped>
.product {
  position: relative;
  display: flex;
  text-decoration: none;
  flex-direction: column;
  gap: 8px;
  max-width: 330px;
  &:hover {
    picture {
      opacity: 0.8;
    }
    p {
      color: var(--color-primary);
    }
  }
  p {
    font-weight: 500;
    color: var(--color-text);
  }
  .price {
    font-weight: 700;
    font-size: 2.4rem;
    color: var(--color-primary);
  }
  picture {
    display: flex;
  }
  :global(.el-rate) {
    height: 22px;
  }
}
p {
  font-weight: 500;
  color: var(--color-text);
}
</style>
