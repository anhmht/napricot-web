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
        height="244px"
        :autoplay="false"
        motion-blur
        indicator-position="none"
        ref="carousel"
      >
        <el-carousel-item :class="$style.category">
          <NuxtLink
            v-for="(category, index) in page1"
            :key="index"
            :to="`/categories?category=${category.slug}`"
          >
            <div>
              <NuxtPicture
                :src="category.src"
                format="webp"
                :alt="category.name"
                width="210"
                height="210"
                :class="$style.picture"
              />
            </div>
            <p>{{ category.name }}</p>
          </NuxtLink>
        </el-carousel-item>
        <el-carousel-item :class="$style.category">
          <NuxtLink
            v-for="(category, index) in page2"
            :key="index"
            :to="`/categories?category=${category.slug}`"
          >
            <div>
              <NuxtPicture
                :src="category.src"
                format="webp"
                :alt="category.name"
                width="210"
                height="210"
              />
            </div>

            <p>{{ category.name }}</p>
          </NuxtLink>
        </el-carousel-item>
      </el-carousel>
      <button :class="$style.left" @click="prev">
        <i class="icon-arrow-right" />
      </button>
      <button :class="$style.right" @click="next">
        <i class="icon-arrow-right" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElCarousel } from 'element-plus'
const page1 = ref([
  {
    src: 'images/categories/category-1.png',
    slug: 'category-1',
    name: 'Hanging Suncatcher'
  },
  {
    src: 'images/categories/category-2.png',
    slug: 'category-1',
    name: 'Glass Cup'
  },
  {
    src: 'images/categories/category-3.png',
    slug: 'category-1',
    name: 'Whiskey Glass'
  },
  {
    src: 'images/categories/category-4.png',
    slug: 'category-1',
    name: 'Leather Belt'
  },
  {
    src: 'images/categories/category-5.png',
    slug: 'category-1',
    name: 'Solar Light'
  },
  {
    src: 'images/categories/category-6.png',
    slug: 'category-1',
    name: 'Mug'
  }
])

const page2 = ref([
  {
    src: 'images/categories/category-7.webp',
    slug: 'category-1',
    name: 'Ornament'
  },
  {
    src: 'images/categories/category-8.webp',
    slug: 'category-1',
    name: 'T-shirt'
  },
  {
    src: 'images/categories/category-9.webp',
    slug: 'category-1',
    name: 'Doormat'
  }
])

const carousel = ref<typeof ElCarousel>()
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
      picture {
        transform: scale(1.2) rotate(10deg);
        opacity: 0.8;
      }
    }
  }
}
.content {
  margin-top: 24px;
  position: relative;
  picture {
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

.left {
  left: -20px;
  transform: translateY(-50%) rotate(180deg);
}
.right {
  right: -20px;
  transform: translateY(-50%);
}
</style>
