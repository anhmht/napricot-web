<template>
  <div :class="$style.aboutUs">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: 'About us', path: '/about-us' }]" />
      </div>
    </div>
    <div class="container">
      <div :class="[$style.wrapper, $device.isMobileOrTablet && $style.mobile]">
        <h1>Napricot Brand Introduction</h1>
        <p>
          The name "Napricot" is a fusion of the letter "N" and the word
          "Apricot." Inspired by the apricot fruit, the name reflects the idea
          that everyone has dreams they wish to realize. At
          <strong>Napricot</strong>, we are dedicated to creating personalized
          products that celebrate the most meaningful people and cherished
          moments in your life
        </p>
        <NuxtPicture
          :class="$style.logo"
          format="webp"
          :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/8a7c1d2c-57eb-4120-5bb6-47e54128e600/large500`"
          alt="Napricot Logo"
          :height="$device.isDesktop ? 100 : 55"
        />
        <h2>Our Mission</h2>
        <p>
          To help people express their individuality through beautifully
          crafted, custom-made items. Founded in 2022 with a passion for
          creativity and an unwavering commitment to quality,
          <strong>Napricot</strong> began with a simple vision: to enable
          personal expression through custom-designed, exquisitely crafted
          items. Today, while our reach has expanded, our mission remains rooted
          in empowering unique expression, making each product a meaningful part
          of our customers' lives.
        </p>
        <h2>Our Commitment</h2>
        <p>
          At <strong>Napricot</strong>, we take pride in the exceptional quality
          of every product. Each item is crafted meticulously using premium
          materials and cutting-edge printing technologies, ensuring that your
          personalized gifts are as beautiful as they are durable. Our team of
          dedicated artisans and designers brings each idea to life, producing
          products that are as distinctive as the individuals who order them.
        </p>
        <NuxtPicture
          format="webp"
          :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/c9787163-6e05-4788-2e77-e2c18e246300/public`"
          alt="Napricot Commitment"
          :width="$device.isDesktop ? 1410 : 375"
          :height="$device.isDesktop ? 340 : 120"
        />
        <h2>Our Products</h2>
        <p>
          We offer a diverse range of personalized products tailored to suit any
          occasion or style. From custom apparel and accessories to unique home
          decor and thoughtful gifts, our collections are thoughtfully curated
          to bring joy and significance to every moment.
        </p>
        <div :class="$style.product">
          <NuxtPicture
            format="webp"
            :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/6e36a2ea-2b29-4881-0981-35505883f100/large`"
            alt="Napricot product"
            :width="$device.isDesktop ? 705 : 360"
            :height="$device.isDesktop ? 705 : 360"
          />
          <div :class="$style.detail">
            <h3>Print on Demand</h3>
            <p>
              Our Print on Demand (POD) service offers a vast array of design
              options, allowing customers to personalize items with ease and
              receive them on demand. This service empowers individuals to
              create one-of-a-kind items that reflect their tastes, enabling
              them to own pieces that are both stylish and personal. From design
              to delivery, our POD process is seamless, making custom products
              accessible and meaningful for all.
            </p>
            <h3>Personalized Gifts</h3>
            <p>
              Whether it’s a birthday, anniversary, wedding, or any special
              occasion, Napricot offers the perfect gift to make it
              unforgettable. Each personalized item speaks to the heart, showing
              loved ones how much they truly mean to you.
            </p>
            <h3>Home Decor</h3>
            <p>
              Enhance your living space with our distinctive home decor
              collection. With items like personalized wall art, custom-made
              pillows, and cozy blankets, you’ll find everything you need to
              make your home a unique reflection of you.
            </p>
            <h3>Everyday Essentials</h3>
            <p>
              Add a personal touch to your daily routine with our wide selection
              of customized essentials, including mugs, tumblers, and phone
              cases. Perfect for personal use or as a thoughtful gift, these
              items bring individuality into the little moments of every day.
            </p>
          </div>
        </div>
        <p>
          <strong>Napricot</strong> proudly stands as a brand founded by four
          passionate individuals – Huy Tran, Hieu Nguyen, Anh Mai, and Hung Vu –
          united by a shared vision of bringing unique, high-quality
          personalized products to life.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent('DefaultOg')

useServerSeoMeta({
  title: () => `About Us | Napricot Brand Introduction`,
  description: () => `we are dedicated to creating personalized
          products that celebrate the most meaningful people and cherished
          moments in your life`,
  ogTitle: () => `About Us | Napricot Brand Introduction`,
  ogDescription: () => `we are dedicated to creating personalized
          products that celebrate the most meaningful people and cherished
          moments in your life`
})

const config = useRuntimeConfig()
</script>

<style lang="postcss" module>
.aboutUs {
  position: relative;
  picture {
    display: flex;
    width: 100%;
  }
}
.breadcrumb {
  background-color: var(--color-background);
  color: var(--color-icon);
  padding: 8px 0;
}
.logo {
  display: flex;
  justify-content: center;
}
.wrapper {
  padding: 36px 0;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  &.mobile {
    padding: 36px 8px;
  }
}
.mobile {
  .product {
    flex-wrap: wrap;
  }
}
.product {
  display: flex;
  gap: 24px;
}
.detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
