<template>
  <div :class="$style.aboutUs">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: 'About us', path: '/about-us' }]" />
      </div>
    </div>
    <div class="container">
      <div :class="$style.wrapper">
        <h1>Napricot Brand Introduction</h1>
        <h2>Our Story</h2>
        <div :class="$style.story">
          <div>
            <p :class="$style.bold">
              We are dedicated to offering you the finest products and services
              that will make you remember us, even if it is just during a brief
              nap.
            </p>
            <br />
            <p>
              The name <strong>"Napricot"</strong> has a special meaning,
              derived from the word <strong>"NAP"</strong>, which means a short
              sleep, and <strong>"Apricot"</strong>, which is the fruit. This
              unique and cute wordplay encapsulates our mission: to provide
              gifts and customer care services that will make you remember us in
              your mind, even if it is just a nap. In addition to bringing
              connections and cherished memories, we strive to create those
              precious moments through our thoughtfully designed, personalized
              products, celebrating the people and occasions that matter most to
              you.
            </p>
          </div>
          <NuxtImg
            provider="myProvider"
            src="/8a7c1d2c-57eb-4120-5bb6-47e54128e600/hero"
            :srcset="`${config.app.imageUrl}/8a7c1d2c-57eb-4120-5bb6-47e54128e600/hero 210w,
                  ${config.app.imageUrl}/8a7c1d2c-57eb-4120-5bb6-47e54128e600/large500 500w`"
            sizes="210 md:500"
            alt="Napricot Logo Brand"
            :class="$style.logo"
          />
        </div>

        <h2>Our Mission</h2>
        <div>
          <p :class="$style.bold">
            To enable individuals to showcase their uniqueness through
            exquisitely crafted, personalized items.
          </p>
          <br />
          <p>
            Our goal is to help people express their uniqueness through
            beautifully crafted, custom-made items. With a passion for
            creativity and a dedication to quality, We founded Napricot to
            introduce a fresh, personalized touch to gifts and home decor. We
            began with a simple idea: to empower personal expression through
            custom, beautifully crafted items. Today, our mission remains
            unchanged, though our reach and product offerings have grown beyond
            our wildest expectations.
          </p>
        </div>

        <h2>Our Commitment</h2>
        <p>
          At <strong>Napricot</strong>, we pride ourselves on the quality of our
          products. Each item is meticulously crafted using the finest materials
          and the latest printing technologies to ensure your personalized gifts
          are both beautiful and durable. Our team of skilled artisans and
          designers works tirelessly to bring your vision to life, creating
          products that are as unique as you are.
        </p>
        <NuxtImg
          provider="myProvider"
          src="/c9787163-6e05-4788-2e77-e2c18e246300/public"
          :srcset="`${config.app.imageUrl}/8a7c1d2c-57eb-4120-5bb6-47e54128e600/hero 375w,
                  ${config.app.imageUrl}/c9787163-6e05-4788-2e77-e2c18e246300/public 1410w`"
          sizes="375 md:1410"
          alt="Napricot Commitment"
          :class="$style.commitment"
        />
        <h2>Our Products</h2>
        <p>
          We provide an extensive array of personalized items suited for every
          occasion and style. From custom apparel and accessories to unique home
          decor and thoughtful gifts, our curated collections are designed to
          add joy and significance to every moment.
        </p>
        <div :class="$style.product">
          <NuxtImg
            provider="myProvider"
            src="/6e36a2ea-2b29-4881-0981-35505883f100/large"
            alt="Napricot product"
            :class="$style.productImg"
          />
          <div :class="$style.detail">
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
        <div :class="$style.goal">
          <h2>Why choose Napricot?</h2>
          <div :class="$style.reason">
            <div :class="$style.service">
              <div :class="$style.icon">
                <NuxtImg
                  src="images/personalize.svg"
                  width="40"
                  height="40"
                  alt="personalize"
                />
              </div>
              <h3>Unmatched Personalization</h3>
              <p>
                We provide a wide variety of customization options, enabling you
                to create one-of-a-kind products that showcase your personality
                and style.
              </p>
            </div>
            <div :class="$style.service">
              <div :class="$style.icon">
                <NuxtImg
                  src="images/service.svg"
                  width="40"
                  height="40"
                  alt="service"
                />
              </div>
              <h3>Exceptional Customer Service</h3>
              <p>
                Our friendly and knowledgeable customer service team is ready to
                assist you in selecting and customizing the perfect product,
                ensuring a seamless and enjoyable shopping experience.
              </p>
            </div>
            <div :class="$style.service">
              <div :class="$style.icon">
                <NuxtImg
                  src="images/delivery.svg"
                  width="40"
                  height="40"
                  alt="delivery"
                />
              </div>
              <h3>Fast and Reliable Shipping</h3>
              <p>
                Understanding the importance of timely delivery for special
                occasions, we offer fast and reliable shipping to ensure your
                personalized gifts arrive on time.
              </p>
            </div>
          </div>
        </div>
        <h2>Join the Napricot Community</h2>
        <p>
          Follow us on social media for the latest updates, exclusive offers,
          and inspiring ideas.
        </p>
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
        <p>Nappricot © 2024. All Rights Reserved</p>
        <p>
          Stay connected with us on social media for the latest updates,
          exclusive offers, and inspiring ideas. Become part of the Napricot
          community and share your unique creations with us. We love to see how
          our products bring joy and personalization to your lives! Thank you
          for choosing Napricot. We're excited to help you create beautiful
          memories and celebrate life's special moments with our personalized
          products.
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

<style lang="postcss" module scoped>
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
  width: 400px;
  height: 100px;
  margin: auto;
}
.commitment {
  width: 1410px;
  height: 340px;
}
.productImg {
  width: 705px;
  height: 705px;
}
.story {
  display: flex;
  gap: 24px;
}
.bold {
  font-weight: 450;
}
.goal {
  padding: 36px 0;
  text-align: center;
  h2 {
    margin-bottom: 24px;
  }
}
.reason {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.service {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  h3 {
    font-size: 3rem;
  }
}
.icon {
  padding: 16px;
  display: flex;
  background: var(--color-primary);
  border-radius: 24px;
  img {
    filter: invert(1);
  }
}
.wrapper {
  padding: 36px 0;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

@media (max-width: 768px) {
  .wrapper {
    padding: 36px 8px;
  }
  .product {
    flex-wrap: wrap;
  }
  .logo {
    width: 210px;
    height: 55px;
  }
  .story {
    flex-wrap: wrap;
  }
  .reason {
    flex-wrap: wrap;
  }
  .commitment {
    width: 100%;
    height: auto;
  }
  .productImg {
    width: 100%;
    height: auto;
  }
}
</style>
