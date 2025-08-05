<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    image?: string
    desc?: string
  }>(),
  {
    title: 'title',
    image:
      'https://staging.napricot.com/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/8a7c1d2c-57eb-4120-5bb6-47e54128e600/large',
    desc: 'desc'
  }
)
</script>

<template>
  <div class="h-full w-full flex items-start justify-start bg-gray-50">
    <div class="flex items-start justify-start w-full h-full">
      <div class="flex flex-row w-full h-full">
        <div
          style="
            padding: 4rem;
            flex-basis: 50%;
            gap: 24px;
            align-content: center;
          "
        >
          <h1 class="text-[42px] m-0 font-black text-center">
            {{ title }}
          </h1>
          <p class="text-2xl p-0 font-bold mb-0 color-[#8B8B8B]">
            {{ desc.length > 100 ? desc.slice(0, 100) + '...' : desc }}
          </p>

          <img
            src="https://staging.napricot.com/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/8a7c1d2c-57eb-4120-5bb6-47e54128e600/hero"
            alt="Napricot"
            width="100%"
            height="100px"
            :style="{
              'object-fit': 'contain',
              'object-position': 'center',
              'margin-top': 'auto'
            }"
          />
        </div>
        <div
          :style="{
            'flex-basis': '50%',
            height: '600px'
          }"
        >
          <img
            :src="image"
            :alt="title"
            width="100%"
            height="100%"
            :style="{
              'object-fit': 'cover',
              'object-position': 'center'
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
