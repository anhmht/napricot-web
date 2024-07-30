<template>
  <div :class="$style.footer">
    <layout-footer-contact-service />
    <layout-footer-link />
    <div :class="$style.logo">
      <NuxtLink to="/">
        <NuxtPicture
          loading="lazy"
          format="webp"
          src="Logo-color.svg"
          alt="Napricot"
          width="210"
          height="55"
        />
      </NuxtLink>
      <div :class="$style.slogan">Slogan is here, content is here</div>
    </div>
    <div :class="$style.bottom">
      <div :class="[$style.wrapper, 'container']">
        <div :class="$style.link">
          <NuxtLink
            v-for="item in data"
            :key="item.name"
            :to="item.link"
            :class="$style.item"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        <div :class="$style.card">
          <div>
            <NuxtLink to="#">
              <NuxtPicture
                format="webp"
                loading="lazy"
                src="images/card/dmca.png"
                alt="Napricot DMCA"
                width="66"
                height="30"
              />
            </NuxtLink>
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              src="images/card/visa.svg"
              alt="Napricot Visa"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              src="images/card/master.svg"
              alt="Napricot Mastercard"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              src="images/card/amex.svg"
              alt="Napricot Discover"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              src="images/card/paypal.svg"
              alt="Napricot Paypal"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              src="images/card/apple.svg"
              alt="Napricot Apple Pay"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              src="images/card/google.svg"
              alt="Napricot Google Pay"
              width="46"
              height="30"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = ref([
  {
    name: 'Terms & Conditions',
    link: '/terms'
  },
  {
    name: 'Privacy Policy',
    link: '/privacy'
  },
  {
    name: 'Shipping Policy',
    link: '/shipping'
  },
  {
    name: 'Legal Statement',
    link: '/legal'
  },
  {
    name: 'Return Policy',
    link: '/return'
  }
])
</script>

<style lang="postcss" module>
.footer {
  position: relative;
}
.logo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 36px 0;
  align-items: center;
  picture {
    display: flex;
  }
  border-top: 1px solid #dcdcdc;
}
.slogan {
  font-size: 2rem;
  font-weight: 300;
  color: var(--color-secondary);
}
.wrapper {
  display: flex;
  justify-content: space-between;
  padding-bottom: 36px;
}
.item {
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-text);
  padding: 0 24px;
  &:hover {
    color: var(--color-primary);
  }
  &:first-child {
    padding-left: 0;
  }
}
.item + .item {
  border-left: 1px solid #dcdcdc;
}
.card {
  display: flex;
  gap: 12px;
  div {
    display: flex;
    width: fit-content;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
    picture {
      display: flex;
    }
  }
}
</style>
