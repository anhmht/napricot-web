<template>
  <div :class="[$style.link, 'container']">
    <div :class="$style.item" v-for="item in data" :key="item.title">
      <div :class="$style.title">{{ item.title }}</div>
      <ul>
        <li v-for="subItem in item.items" :key="subItem.name">
          <nuxt-link :to="subItem.link">{{ subItem.name }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div :class="$style.item">
      <div>
        <div :class="[$style.title, $style.follow]">Follow Us</div>
        <div :class="$style.social">
          <NuxtLink to="#" _target="blank" aria-label="Facebook">
            <i class="icon-facebook"></i>
          </NuxtLink>
          <NuxtLink to="#" _target="blank" aria-label="Twitter">
            <i class="icon-twitter"></i>
          </NuxtLink>
          <NuxtLink to="#" _target="blank" aria-label="Amazon">
            <i class="icon-amazon"></i>
          </NuxtLink>
          <NuxtLink to="#" _target="blank" aria-label="Etsy">
            <i class="icon-etsy"></i>
          </NuxtLink>
          <NuxtLink to="#" _target="blank" aria-label="Walmart">
            <i class="icon-walmart"></i>
          </NuxtLink>
          <NuxtLink to="#" _target="blank" aria-label="Tiktok">
            <i class="icon-tiktok"></i>
          </NuxtLink>
        </div>
        <div :class="$style.napricot">
          Nappricot © 2025. All Rights Reserved
        </div>
      </div>
      <layout-language :class="$style.lang" />
    </div>
  </div>
</template>

<script setup lang="ts">
const data = ref([
  {
    title: 'Policy',
    items: [
      { name: 'Privacy', link: '/policy/privacy' },
      {
        name: 'Cancellation & Modification',
        link: '/policy/cancel'
      },
      { name: 'Shipping & Delivery', link: '/policy/shipping' },
      { name: 'Returns & Refund', link: '/policy/return' }
    ]
  },
  {
    title: 'Help',
    items: [
      { name: 'FAQ', link: '/help/faq' },
      { name: 'Contact Us', link: '/help/contact' }
    ]
  },
  {
    title: 'Order',
    items: [
      { name: 'Tracking', link: '#' },
      { name: 'Orders', link: '#' },
      { name: 'Account', link: '#' },
      { name: 'Payment', link: '#' }
    ]
  },
  {
    title: 'About',
    items: [
      { name: 'About us', link: '/about-us' },
      { name: 'Invite Friends', link: '#' }
    ]
  }
])
</script>

<style lang="postcss" module scoped>
.link {
  padding: 48px 0 36px 0;
  display: flex;
  justify-content: space-between;
}
.item {
  &:last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
  &.follow {
    margin-bottom: 12px;
  }
}
ul {
  margin: 0;
  list-style: none;
  padding: 0;
}
li {
  font-size: 1.6rem;
  font-weight: 400;
  a {
    text-decoration: none;
    color: var(--color-text);
    &:hover {
      color: var(--color-primary);
    }
  }
}
li + li {
  margin-top: 16px;
}
.social {
  display: flex;
  gap: 16px;
  a {
    font-size: 1.4rem;
    color: var(--color-background-secondary);
    text-decoration: none;
    padding: 8px;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    display: flex;
    align-items: center;
    &:hover {
      color: var(--color-primary);
    }
  }
}
.napricot {
  font-size: 1.6rem;
  font-weight: 400;
  margin-top: 12px;
}
@media (max-width: 768px) {
  .link {
    flex-wrap: wrap;
    padding: 16px;
    flex-wrap: wrap;
    row-gap: 20px;
    padding: 16px;
    justify-content: flex-start;
  }
  .item {
    flex-basis: 50%;
  }
  .lang {
    display: none;
  }
}
</style>
