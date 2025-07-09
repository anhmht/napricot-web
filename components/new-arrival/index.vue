<template>
  <div id="new-arrival" :class="$style.newArrival">
    <div :class="$style.title">
      <h4>New arrival</h4>
      <NuxtLink to="#"
        >See all
        <i class="icon-arrow-down"></i>
      </NuxtLink>
    </div>
    <div :class="$style.content">
      <custom-tab :tabs="tabs" @change="changeTab"></custom-tab>
      <CommonCarousel
        ref="carousel"
        :autoplay="false"
        height="936px"
        mobile-height="990px"
        :slide-count="4"
        :display-indicator="false"
      >
        <template
          v-for="(item, index) in newArrival(config)"
          :key="index"
          v-slot:[`slide-${index+1}`]
        >
          <div :class="$style.wrapper">
            <product-item
              v-for="(product, i) in item.products"
              :data="product"
              :key="i"
            />
          </div>
        </template>
      </CommonCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { newArrival } from '~/data/NewArrival'

const config = useRuntimeConfig()
const tabs = newArrival(config).map((item) => item.name)

const carousel = ref()

const changeTab = (index: number) => {
  carousel.value?.changeSlide(index)
}
</script>

<style lang="postcss" module scoped>
.newArrival {
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
  flex-direction: column;
  gap: 24px;
}
.wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
@media (max-width: 768px) {
  .newArrival {
    padding: 16px;
  }
  .wrapper {
    gap: 16px;
    justify-content: center;
  }
  .content {
    gap: 16px;
    margin-top: 16px;
  }
}
</style>
