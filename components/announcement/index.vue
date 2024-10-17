<template>
  <div v-show="isOpen" :class="$style.announcement">
    Sign up and get 20% off to your first order.
    <nuxt-link to="/sign-in?active=sign-up">Sign up now</nuxt-link>
    <i v-if="$device.isDesktop" class="icon-close-fill" @click="close" />
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(true)

const close = () => {
  isOpen.value = false
}
</script>

<style lang="postcss" module>
.announcement {
  z-index: 3;
  position: relative;
  padding: 8px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  background: linear-gradient(94deg, #eb7638 0%, #f1b85b 100%);
  a {
    color: #fff;
    text-decoration: underline;
    font-weight: 700;
  }
  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    font-size: 1.4rem;
    cursor: pointer;
  }
}
</style>
