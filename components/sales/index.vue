<template>
  <div id="sales" :class="$style.sales">
    <NuxtLink to="#" v-for="item in data">
      <NuxtImg
        provider="myProvider"
        :src="`${item.src}avatar176`"
        :alt="item.alt"
        :srcset="`${imageUrl}${item.src}avatar176 160w, ${imageUrl}${item.src}thumbnail 330w`"
        sizes="160 md:330"
        preload
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const {
  public: { imageUrl }
} = useRuntimeConfig()

const data = ref([
  {
    src: `/1ea8e709-d58d-4d54-dfb3-ff4e73853a00/`,
    alt: 'Napricot Sales 1'
  },
  {
    src: `/bf639e4d-df76-4ff5-4f4c-2a68291efb00/`,
    alt: 'Napricot Sales 2'
  },
  {
    src: `/fd4b8a82-6bc0-4199-0921-dec68dccb800/`,
    alt: 'Napricot Sales 3'
  },
  {
    src: `/5d87daf0-6b42-4aeb-cbbe-be950c15bd00/`,
    alt: 'Napricot Sales 4'
  }
])
</script>

<style lang="postcss" module>
.sales {
  scroll-margin-top: 150px;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  img {
    width: 330px;
    height: 330px;
  }
  a:hover {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    img {
      width: 160px;
      height: 160px;
    }
  }
}
</style>
