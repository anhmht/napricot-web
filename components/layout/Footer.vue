<template>
  <div :class="$style.footer">
    <layout-footer-contact-service />
    <layout-footer-link />
    <div :class="$style.logo">
      <NuxtLink to="/">
        <NuxtPicture
          loading="lazy"
          format="webp"
          :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/8a7c1d2c-57eb-4120-5bb6-47e54128e600/thumbnail`"
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
            <NuxtLink to="#" aria-label="DMCA">
              <NuxtPicture
                format="webp"
                loading="lazy"
                :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/bd5cdd1a-2b78-4d26-2aec-380916554600/tiny`"
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
              :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/239af571-3f22-43a7-bc3e-426ee1312d00/avatar48`"
              alt="Napricot Visa"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/824b59ef-69ba-4ed1-5724-8288e6209700/avatar48`"
              alt="Napricot Mastercard"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/48421676-c50c-4bd2-7b65-c31799aefc00/avatar48`"
              alt="Napricot Discover"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/7c4e5313-89fe-4822-7ee2-45b1cd89be00/avatar48`"
              alt="Napricot Paypal"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/4257b0c9-3608-4d40-9547-34fa7d2f0c00/avatar48`"
              alt="Napricot Apple Pay"
              width="46"
              height="30"
            />
          </div>
          <div>
            <NuxtPicture
              format="webp"
              loading="lazy"
              :src="`${config.app.baseUrl}/cdn-cgi/imagedelivery/veUt9FrhEFdGkfvZziYqkw/c4b7b550-a675-40de-4529-2d095fb55d00/avatar48`"
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
const config = useRuntimeConfig()
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
