<template>
  <div :class="$style.footer">
    <layout-footer-contact-service />
    <layout-footer-link />
    <div :class="$style.logo">
      <NuxtLink to="/">
        <NuxtImg
          loading="lazy"
          provider="myProvider"
          src="/8a7c1d2c-57eb-4120-5bb6-47e54128e600/thumbnail"
          alt="Napricot Footer Logo"
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
            <NuxtLink to="#" aria-label="DMCA">
              <NuxtImg
                provider="myProvider"
                loading="lazy"
                src="/bd5cdd1a-2b78-4d26-2aec-380916554600/tiny"
                alt="Napricot DMCA"
                width="66"
                height="30"
              />
            </NuxtLink>
          </div>
          <div>
            <NuxtImg
              provider="myProvider"
              loading="lazy"
              src="/239af571-3f22-43a7-bc3e-426ee1312d00/avatar48"
              alt="Napricot Visa"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtImg
              provider="myProvider"
              loading="lazy"
              src="/824b59ef-69ba-4ed1-5724-8288e6209700/avatar48"
              alt="Napricot Mastercard"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtImg
              provider="myProvider"
              loading="lazy"
              src="/48421676-c50c-4bd2-7b65-c31799aefc00/avatar48"
              alt="Napricot Discover"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtImg
              provider="myProvider"
              loading="lazy"
              src="/7c4e5313-89fe-4822-7ee2-45b1cd89be00/avatar48"
              alt="Napricot Paypal"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtImg
              provider="myProvider"
              loading="lazy"
              src="/4257b0c9-3608-4d40-9547-34fa7d2f0c00/avatar48"
              alt="Napricot Apple Pay"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtImg
              provider="myProvider"
              loading="lazy"
              src="/c4b7b550-a675-40de-4529-2d095fb55d00/avatar48"
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
    link: '/policy/terms'
  },
  {
    name: 'Privacy Policy',
    link: '/policy/privacy'
  },
  {
    name: 'Shipping Policy',
    link: '/policy/shipping'
  },
  {
    name: 'Cancellation Policy',
    link: '/policy/cancel'
  },
  {
    name: 'Return Policy',
    link: '/policy/return'
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  div {
    display: flex;
    width: fit-content;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
  }
  a {
    display: flex;
  }
}
@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    gap: 24px;
  }
  .link {
    padding: 0 16px;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .item {
    padding: 0;
  }
  .item + .item {
    border: none;
  }
  .card {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
