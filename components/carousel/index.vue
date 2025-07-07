<template>
  <div :class="$style.carousel">
    <div :class="$style.wrapper" v-if="loading">
      <NuxtImg
        provider="myProvider"
        src="/711e1703-1ca3-4eb2-9e9d-be6e44e2e400/public"
        :srcset="`${imageUrl}/711e1703-1ca3-4eb2-9e9d-be6e44e2e400/large500 375w,
            ${imageUrl}/711e1703-1ca3-4eb2-9e9d-be6e44e2e400/public 1410w`"
        sizes="375 md:1410"
        alt="Napricot Banner 1"
        preload
        @load="loading = false"
      />
      <div :class="$style.overlay">
        <div :class="$style.contentWrapper">
          <div :class="$style.content">
            <p><i class="icon-verified_user" /> napricot GUARANTEED FIT</p>
            <h3>Rev up your T-shirt</h3>
            <h6>
              Unique gift ideas, and beautiful design for shopping on Napricot
            </h6>
            <button>Shop Now</button>
          </div>
        </div>
      </div>
    </div>
    <el-carousel
      v-else
      motion-blur
      :interval="3000"
      arrow="never"
      height="340px"
    >
      <el-carousel-item>
        <div :class="$style.wrapper">
          <NuxtImg
            provider="myProvider"
            src="/711e1703-1ca3-4eb2-9e9d-be6e44e2e400/public"
            :srcset="`${imageUrl}/711e1703-1ca3-4eb2-9e9d-be6e44e2e400/large500 375w,
            ${imageUrl}/711e1703-1ca3-4eb2-9e9d-be6e44e2e400/public 1410w`"
            sizes="375 md:1410"
            alt="Napricot Banner 1"
          />
          <div :class="$style.overlay">
            <div :class="$style.contentWrapper">
              <div :class="$style.content">
                <p><i class="icon-verified_user" /> napricot GUARANTEED FIT</p>
                <h3>Rev up your T-shirt</h3>
                <h6>
                  Unique gift ideas, and beautiful design for shopping on
                  Napricot
                </h6>
                <button>Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <NuxtLink to="#">
          <NuxtImg
            provider="myProvider"
            src="/51f64545-6417-4083-5e4e-c3d211e16e00/public"
            :srcset="`${imageUrl}/51f64545-6417-4083-5e4e-c3d211e16e00/large500 375w,
            ${imageUrl}/51f64545-6417-4083-5e4e-c3d211e16e00/public 1410w`"
            sizes="375 md:1410"
            alt="Napricot Banner 2"
          />
        </NuxtLink>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
const {
  public: { imageUrl }
} = useRuntimeConfig()
</script>

<style lang="postcss" module>
.carousel {
  height: 340px;
  img {
    position: relative;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 340px;
  }
  a:hover {
    opacity: 0.8;
  }
}
.wrapper {
  position: relative;
  width: 100%;
}
.overlay {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0.35) 100%
    ),
    rgb(211 211 211 / 0%) 50% / cover no-repeat;
}
.contentWrapper {
  position: relative;
  display: flex;
  height: 100%;
}
.content {
  position: absolute;
  top: 50%;
  left: 64px;
  transform: translateY(-50%);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 14px;
  p {
    font-size: 1.6rem;
    font-weight: 400;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 14px;
    i {
      font-size: 2.4rem;
    }
  }
  h3 {
    font-size: 3.6rem;
    font-weight: 900;
    line-height: 44px;
  }
  h6 {
    font-weight: 700;
  }
  button {
    width: fit-content;
    padding: 12px 24px;
    border-radius: 62px;
    background: var(--color-primary);
    border: none;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: var(--color-primary-light);
    }
  }
}
:global(.el-carousel__indicators) {
  z-index: 1;
}
:global(.el-carousel__indicator) {
  width: 10px;
  height: 10px;
  button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 1;
  }
}
:global(.el-carousel__indicator.is-active) {
  button {
    background-color: var(--color-primary);
  }
}
</style>
