<template>
  <NuxtLink
    :to="`/product/${data.slug}`"
    :class="[$style.product, $device.isMobileOrTablet && $style.mobile]"
  >
    <div :class="bestSelling && $style.bestSell">
      <NuxtPicture
        format="webp"
        loading="lazy"
        :src="data.image"
        :alt="data.name"
        :width="
          $device.isDesktop
            ? bestSelling
              ? 318
              : 330
            : bestSelling
            ? 151
            : 163
        "
        :height="
          $device.isDesktop
            ? bestSelling
              ? 318
              : 330
            : bestSelling
            ? 151
            : 163
        "
      />
    </div>

    <p>{{ data.name }}</p>
    <div :class="$style.price">
      ${{ price }} <span v-if="data.sale">${{ oldPrice }}</span>
    </div>
    <ClientOnly>
      <el-rate v-model="rate" disabled show-score score-template="({value})" />
    </ClientOnly>
    <div :class="$style.tag">
      <span v-if="data.sale" :class="$style.sale">SALE!</span>
      <span v-if="data.new" :class="$style.new">New</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const rate = ref(randomRate(4, 5))
const props = defineProps({
  data: {
    type: Object as () => Product,
    required: true
  },
  bestSelling: {
    type: Boolean,
    default: false
  }
})

const price = computed(() => props.data.price.toFixed(2))
const oldPrice = computed(() => (props.data.price * 1.8).toFixed(2))
</script>

<style lang="postcss" module scoped>
.product {
  position: relative;
  display: flex;
  text-decoration: none;
  flex-direction: column;
  gap: 8px;
  max-width: 330px;
  &.mobile {
    max-width: 163px;
  }
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
    line-height: 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    span {
      font-size: 1.6rem;
      color: #595959;
      font-weight: 400;
      text-decoration: line-through;
    }
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
.bestSell {
  background-image: linear-gradient(
    90deg,
    var(--color-primary) 20%,
    rgba(241, 184, 91, 1) 100%
  );
  padding: 6px;
}
.tag {
  display: flex;
  gap: 4px;
  flex-direction: column;
  position: absolute;
  top: 12px;
  right: 12px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;
}
.sale {
  padding: 4px 12px;
  border-radius: 64px;
  background: linear-gradient(
    90deg,
    var(--color-primary) 20%,
    rgba(241, 184, 91, 1) 100%
  );
  text-align: center;
  box-shadow: 0px 1px 5px 0px #00000080;
}
.new {
  border-radius: 64px;
  background: #a3fe9a;
  color: #235323;
  padding: 4px 12px;
  display: flex;
  margin-left: auto;
  box-shadow: 0px 1px 5px 0px #00000080;
}
</style>
