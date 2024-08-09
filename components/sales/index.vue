<template>
  <div id="sales" :class="$style.sales">
    <NuxtLink to="#" v-for="item in data">
      <NuxtPicture
        format="webp"
        :src="item.src"
        :alt="item.alt"
        width="330"
        height="330"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const data = ref([
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/1ea8e709-d58d-4d54-dfb3-ff4e73853a00/thumbnail`,
    alt: 'Napricot Sales'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/bf639e4d-df76-4ff5-4f4c-2a68291efb00/thumbnail`,
    alt: 'Napricot Sales'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/fd4b8a82-6bc0-4199-0921-dec68dccb800/thumbnail`,
    alt: 'Napricot Sales'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/5d87daf0-6b42-4aeb-cbbe-be950c15bd00/thumbnail`,
    alt: 'Napricot Sales'
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
  a:hover {
    opacity: 0.8;
  }
  picture {
    display: flex;
  }
}
</style>
