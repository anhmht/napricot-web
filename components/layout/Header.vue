<template>
  <div :class="$style.header">
    <div :class="$style.headerWrapper">
      <div
        :class="[
          $style.mainHeader,
          'container',
          $device.isMobileOrTablet ? $style.mobile : ''
        ]"
      >
        <NuxtLink to="/">
          <NuxtPicture
            format="webp"
            :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/8a7c1d2c-57eb-4120-5bb6-47e54128e600/thumbnail`"
            alt="Napricot"
            :width="$device.isMobileOrTablet ? '120' : '158'"
            height="39"
          />
        </NuxtLink>
        <div v-if="$device.isDesktop" :class="$style.category">
          <layout-header-category />
        </div>
        <div v-if="$device.isDesktop" :class="$style.search">
          <layout-header-search />
        </div>
        <div :class="$style.profile">
          <layout-header-profile />
        </div>
      </div>
    </div>
    <div
      v-if="store.showOverlay"
      :class="[
        $style.overlay,
        scrollUp && $style.scrollUp,
        scrollDown && $style.scrollDown
      ]"
    ></div>

    <div
      :class="[
        $style.subHeader,
        'container',
        $device.isMobileOrTablet && $style.mobile,
        scrollUp && $style.scrollUp,
        scrollDown && $style.scrollDown
      ]"
    >
      <layout-header-link />
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const store = useMainStore()
const scrollUp = ref<boolean>(false)
const scrollDown = ref<boolean>(false)

onMounted(() => {
  let lastScroll = 0
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY
    if (currentScroll <= 0) {
      scrollUp.value = false
      return
    }

    if (currentScroll > lastScroll && !scrollDown.value) {
      // down
      scrollUp.value = false
      scrollDown.value = true
    } else if (currentScroll < lastScroll && scrollDown.value) {
      // up
      scrollUp.value = true
      scrollDown.value = false
    }
    lastScroll = currentScroll
  })
})
</script>

<style lang="postcss" module>
.header {
  border-bottom: 1px solid #dcdcdc;
  position: sticky;
  top: 0;
  z-index: 3;
  background: #fff;
  picture {
    display: flex;
  }
}
.mobile {
  .category {
    margin: 0;
  }
  .search {
    margin: 0;
  }
  .profile {
    margin-left: auto;
  }
}
.headerWrapper {
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.05);
  background: #fff;
}
.overlay {
  position: absolute;
  top: 72px;
  left: 0;
  width: 100%;
  height: 54px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  &.scrollUp {
    transform: none;
  }
  &.scrollDown {
    transform: translate3d(0, -100%, 0);
    z-index: -1;
  }
}
.mainHeader {
  position: relative;
  display: flex;
  padding: 16px 0;
  &.mobile {
    padding: 8px 16px;
  }
}
.category {
  margin-left: 44px;
  display: flex;
}
.search {
  margin-left: 44px;
  display: flex;
  align-items: center;
  flex: 1;
}
.profile {
  display: flex;
  margin-left: 72px;
}
.subHeader {
  position: absolute;
  bottom: -55px;
  left: 0;
  right: 0;
  background: #fff;
  z-index: -1;
  transition: all 0.3s ease;
  &.mobile {
    bottom: -46px;
  }
  &.scrollUp {
    transform: none;
  }
  &.scrollDown {
    transform: translate3d(0, -100%, 0);
  }
}
</style>
