<template>
  <div :class="[$style.customer, $device.isMobileOrTablet && $style.mobile]">
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
        :width="$device.isDesktop ? 269 : 163"
        :height="$device.isDesktop ? 282 : 176"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const customers = [
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/6501ea48-4fda-490e-0c8c-43a60c6bdf00/thumbnail269`,
    name: 'John Doe'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/6235c5d4-bcb7-4fef-0967-bab1c0a63f00/thumbnail269`,
    name: 'Jane Doe'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/ec28fac0-ff6f-4574-88ee-ad4ddde2e700/thumbnail269`,
    name: 'John Smith'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/4d7926fa-2e48-46ca-0c70-439c6c3cd100/thumbnail269`,
    name: 'Jane Smith'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/a93259d1-d00c-4964-dd65-924a6f809a00/thumbnail269`,
    name: 'John Doe'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/79e0e418-6403-4540-939d-e69785572700/thumbnail269`,
    name: 'Jane Doe'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/8a1dace1-e38d-41ab-eaff-d35ebfcabb00/thumbnail269`,
    name: 'John Smith'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/d333d96d-73c8-4fd4-f194-014c40c08e00/thumbnail269`,
    name: 'Jane Smith'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/9b2ba6df-73ac-4890-94cd-61decd953100/thumbnail269`,
    name: 'Jane Smith'
  },
  {
    src: `${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/a1bbde0a-b1e1-4c1b-2811-8e6052d30d00/thumbnail269`,
    name: 'Jane Smith'
  }
]
</script>

<style lang="postcss" module>
.customer {
  position: relative;
  &.mobile {
    padding: 0 16px;
  }
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
    display: flex;
  }
}
.mobile {
  .content {
    margin-top: 16px;
    justify-content: center;
  }
}
</style>
