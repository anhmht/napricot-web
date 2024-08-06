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
      <el-carousel
        ref="carousel"
        :autoplay="false"
        motion-blur
        indicator-position="none"
        arrow="never"
        height="936px"
      >
        <el-carousel-item v-for="(item, index) in newArrival" :key="index">
          <div :class="$style.wrapper">
            <product-item
              v-for="(product, i) in item.products"
              :data="product"
              :key="i"
            />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElCarousel } from 'element-plus'

const tabs = newArrival.map((item) => item.name)
const carousel = ref<typeof ElCarousel>()

const changeTab = (index: number) => {
  carousel.value?.setActiveItem(index)
}
</script>

<style lang="postcss" module>
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
</style>
