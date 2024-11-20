<template>
  <div :class="$style.shop">
    <div :class="$style.title">
      <h4>Shop by Product</h4>
      <NuxtLink to="#"
        >See all
        <i class="icon-arrow-down"></i>
      </NuxtLink>
    </div>
    <div :class="$style.content">
      <el-carousel
        arrow="never"
        :height="isDesktop ? '244px' : '396px'"
        :autoplay="false"
        motion-blur
        indicator-position="none"
        ref="carousel"
      >
        <el-carousel-item
          :class="$style.category"
          v-for="(item, index) in categories"
          :key="index"
        >
          <NuxtLink
            v-for="(category, index) in item"
            :key="index"
            :to="`/categories?category=${category.slug}`"
          >
            <div>
              <NuxtImg
                :src="`${category.src}hero`"
                format="webp"
                :alt="`${category.name} image`"
                :class="$style.picture"
              />
            </div>
            <p>{{ category.name }}</p>
          </NuxtLink>
        </el-carousel-item>
      </el-carousel>

      <button aria-label="Left" :class="$style.left" @click="prev">
        <i class="icon-arrow-right" />
      </button>
      <button aria-label="Right" :class="$style.right" @click="next">
        <i class="icon-arrow-right" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const { isDesktop } = useMediaQuery()

const page1 = ref([
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/961a4543-42cb-4e59-bda9-49caa4de8c00/`,
    slug: 'category-1',
    name: 'Hanging Suncatcher'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/3b49c6d4-805a-4e96-adc5-b96f41aefa00/`,
    slug: 'category-1',
    name: 'Glass Cup'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/faaf5686-b294-4115-cf33-a22b8862c300/`,
    slug: 'category-1',
    name: 'Whiskey Glass'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/fba3e489-8489-4836-6a45-36ea881a0a00/`,
    slug: 'category-1',
    name: 'Leather Belt'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/f23b31ed-4079-439a-9f26-4ceaaf434800/`,
    slug: 'category-1',
    name: 'Solar Light'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/7a20bfa3-6b4a-4708-be3d-1447688aaf00/`,
    slug: 'category-1',
    name: 'Mug'
  }
])

const page2 = ref([
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/eb0fc99c-7de9-47c8-37e1-a9f43223ab00/`,
    slug: 'category-1',
    name: 'Ornament'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/81cd0e9d-7ac0-4d23-7854-47913eef6000/`,
    slug: 'category-1',
    name: 'T-shirt'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/3c03ce56-a8fd-4920-6f69-52a071afab00/`,
    slug: 'category-1',
    name: 'Doormat'
  }
])

const page2Mobile = ref([
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/f23b31ed-4079-439a-9f26-4ceaaf434800/`,
    slug: 'category-1',
    name: 'Solar Light'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/7a20bfa3-6b4a-4708-be3d-1447688aaf00/`,
    slug: 'category-1',
    name: 'Mug'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/eb0fc99c-7de9-47c8-37e1-a9f43223ab00/`,
    slug: 'category-1',
    name: 'Ornament'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/81cd0e9d-7ac0-4d23-7854-47913eef6000/`,
    slug: 'category-1',
    name: 'T-shirt'
  }
])

const items = computed<Array<{ src?: string; slug?: string; name?: string }[]>>(
  () => [
    isDesktop.value ? page1.value : page1.value.slice(0, 4),
    isDesktop.value ? page2.value : page2Mobile.value,
    isDesktop.value ? [] : [page2.value[page2.value.length - 1]]
  ]
)

const categories = computed(() => {
  return isDesktop.value ? items.value.slice(0, 2) : items.value
})

const carousel = ref()
const prev = () => carousel.value?.prev()
const next = () => carousel.value?.next()
</script>

<style lang="postcss" module scoped>
.shop {
  position: relative;
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
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: baseline;
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
.category {
  display: flex;
  gap: 30px;
  a {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-decoration: none;
    color: var(--color-text);
    div {
      overflow: hidden;
    }
    p {
      font-size: 1.8rem;
      font-weight: 500;
      text-align: center;
    }
    &:hover {
      color: var(--color-primary);
      img {
        transform: scale(1.2) rotate(10deg);
        opacity: 0.8;
      }
    }
  }
}
.content {
  margin-top: 24px;
  position: relative;
  img {
    display: flex;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  button {
    position: absolute;
    top: 50%;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    padding: 8px;
    cursor: pointer;
    display: flex;
    &:hover {
      i {
        color: var(--color-primary);
      }
    }
    i {
      font-size: 2rem;
      color: var(--color-icon);
    }
  }
}
.picture {
  width: 210px;
  height: 210px;
}

.left {
  left: -20px;
  transform: translateY(-50%) rotate(180deg);
}
.right {
  right: -20px;
  transform: translateY(-50%);
}

@media (max-width: 768px) {
  .shop {
    padding: 0 16px;
  }
  .category {
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    a {
      p {
        font-size: 1.4rem;
      }
    }
  }
  .picture {
    width: 164px;
    height: 164px;
  }
  .left {
    left: -12px;
  }
  .right {
    right: -12px;
  }
}
</style>
