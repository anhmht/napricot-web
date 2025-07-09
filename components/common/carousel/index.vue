<template>
  <div
    class="carousel-container"
    :style="{
      '--desktop-height': props.height,
      '--mobile-height': props.mobileHeight
    }"
  >
    <swiper
      :modules="modules"
      :slides-per-view="props.slidesPerView"
      :space-between="0"
      :loop="true"
      :autoplay="autoplayConfig"
      :pagination="props.displayIndicator ? { clickable: true } : false"
      :navigation="false"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="slideIndex in props.slideCount" :key="slideIndex">
        <slot :name="`slide-${slideIndex}`" />
      </SwiperSlide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface Props {
  interval?: number
  height?: string
  mobileHeight?: string
  autoplay?: boolean
  slidesPerView?: number
  direction?: 'horizontal' | 'vertical'
  slideCount?: number
  displayIndicator?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  interval: 3000,
  height: '340px',
  mobileHeight: '990px',
  autoplay: true,
  slidesPerView: 1,
  direction: 'horizontal',
  slideCount: 2,
  displayIndicator: true
})

const modules = [Autoplay, Pagination, Navigation]

const autoplayConfig = computed(() => {
  return props.autoplay
    ? {
        delay: props.interval,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }
    : false
})

const currentSlide = ref(0)
const swiperInstance = ref<SwiperType | null>(null)

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
}

const onSlideChange = (swiper: SwiperType) => {
  currentSlide.value = swiper.realIndex
}

const changeSlide = (index: number) => {
  if (swiperInstance.value && index >= 0 && index < props.slideCount) {
    swiperInstance.value.slideTo(index)
  }
}

const prev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
  }
}

const next = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

// Expose the function so parent components can call it
defineExpose({
  changeSlide,
  prev,
  next,
  currentSlide: readonly(currentSlide)
})
</script>

<style lang="postcss">
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: var(--desktop-height);
}

@media (max-width: 768px) {
  .carousel-container {
    height: var(--mobile-height);
  }
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: 100%;
  height: 100%;
  display: block;
}

.swiper-pagination {
  bottom: 20px !important;
}

.swiper-pagination-bullet {
  width: 10px !important;
  height: 10px !important;
  background-color: #fff !important;
  opacity: 0.7 !important;
  transition: all 0.3s ease !important;
}

.swiper-pagination-bullet:hover {
  opacity: 0.9 !important;
}

.swiper-pagination-bullet-active {
  background-color: var(--color-primary) !important;
  opacity: 1 !important;
}
</style>
