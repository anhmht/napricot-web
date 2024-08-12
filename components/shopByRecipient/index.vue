<template>
  <div id="shop-by-recipient" :class="$style.recipient">
    <div :class="$style.title">
      <h4>Shop by Recipient</h4>
      <NuxtLink to="#"
        >See all
        <i class="icon-arrow-down"></i>
      </NuxtLink>
    </div>
    <div :class="$style.content">
      <NuxtLink v-for="(item, index) in recipients(config)" to="#" :key="index">
        <div>
          <NuxtPicture
            :src="item.src"
            format="webp"
            loading="lazy"
            :alt="`${item.title} image`"
            width="330"
            height="330"
          />
        </div>
        <p>{{ item.title }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<style lang="postcss" module>
.recipient {
  display: block;
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
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-evenly;
  align-items: center;
  a {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;
    text-decoration: none;
    div {
      overflow: hidden;
      border-radius: 50%;
    }
    &:hover {
      p {
        color: var(--color-primary);
      }
      picture {
        transform: scale(1.2) rotate(10deg);
        opacity: 0.8;
      }
    }
    p {
      font-weight: 500;
      font-size: 1.8rem;
      color: var(--color-text);
    }
  }
  picture {
    display: flex;
    border-radius: 50%;
    transition: transform 0.3s ease;
    img {
      border-radius: 50%;
    }
  }
}
</style>
