<template>
  <div :class="$style.customer">
    <div :class="$style.title">
      <h4>Happy Customers</h4>
      <NuxtLink to="#"
        >See all
        <i class="icon-arrow-down"></i>
      </NuxtLink>
    </div>
    <div :class="$style.content">
      <NuxtPicture
        v-for="(customer, index) in customers"
        :key="index"
        :src="customer.src"
        format="webp"
        loading="lazy"
        :alt="customer.name"
        width="269"
        height="282"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const customers = [
  {
    src: '/images/customer/customer-1.png',
    name: 'John Doe'
  },
  {
    src: '/images/customer/customer-2.png',
    name: 'Jane Doe'
  },
  {
    src: '/images/customer/customer-3.png',
    name: 'John Smith'
  },
  {
    src: '/images/customer/customer-4.png',
    name: 'Jane Smith'
  },
  {
    src: '/images/customer/customer-5.png',
    name: 'John Doe'
  },
  {
    src: '/images/customer/customer-6.png',
    name: 'Jane Doe'
  },
  {
    src: '/images/customer/customer-7.png',
    name: 'John Smith'
  },
  {
    src: '/images/customer/customer-8.jpeg',
    name: 'Jane Smith'
  },
  {
    src: '/images/customer/customer-9.png',
    name: 'Jane Smith'
  },
  {
    src: '/images/customer/customer-10.png',
    name: 'Jane Smith'
  }
]
</script>

<style lang="postcss" module>
.customer {
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
  gap: 16px;
  justify-content: space-evenly;
  picture {
    border-radius: 8px;
    overflow: hidden;
  }
}
</style>
