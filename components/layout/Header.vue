<template>
  <div :class="$style.header">
    <div :class="$style.headerWrapper">
      <div :class="[$style.mainHeader, 'container']">
        <NuxtLink to="/">
          <NuxtPicture
            format="webp"
            :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/8a7c1d2c-57eb-4120-5bb6-47e54128e600/thumbnail`"
            alt="Napricot"
            width="158"
            height="39"
          />
        </NuxtLink>
        <div :class="$style.category">
          <layout-header-category />
        </div>
        <div :class="$style.search">
          <layout-header-search />
        </div>
        <div :class="$style.profile">
          <layout-header-profile />
        </div>
      </div>
    </div>

    <div :class="[$style.subHeader, 'container']">
      <layout-header-link />
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<style lang="postcss" module>
.header {
  border-bottom: 1px solid #dcdcdc;
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
}
.headerWrapper {
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.05);
}
.mainHeader {
  position: relative;
  display: flex;
  padding: 16px 0;
}
.category {
  margin-left: 44px;
  display: flex;
  align-items: center;
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
</style>
