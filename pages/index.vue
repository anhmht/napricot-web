<template>
  <div class="container">
    <div :class="$style.home">
      <carousel />
      <sales />
      <trending />
      <shop-by-product />
      <best-seller />
      <banner />
      <shop-by-recipient />
      <new-arrival />
      <ad-banner />
      <newsletter />
      <happy-customer />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent('DefaultOg')

useServerSeoMeta({
  title: () => `Home`,
  description: () =>
    `Napricot Eyelash Beauty offers pre-made lash fans designed for perfectionists combining comfort, curl consistency, and pro-level performance.`,
  ogTitle: () => `Napricot Eyelash Beauty`,
  ogSiteName: () => 'Napricot Eyelash Beauty',
  ogDescription: () =>
    `Napricot Eyelash Beauty offers pre-made lash fans designed for perfectionists combining comfort, curl consistency, and pro-level performance.`
})

useHead({
  meta: [
    {
      name: 'description',
      content:
        'Napricot Eyelash Beauty offers pre-made lash fans designed for perfectionists combining comfort, curl consistency, and pro-level performance.'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Napricot Eyelash Beauty',
        description: `Napricot Eyelash Beauty offers pre-made lash fans designed for perfectionists combining comfort, curl consistency, and pro-level performance.`,
        url: `https://napricot.com`,
        inLanguage: 'en-US'
      })
    }
  ]
})
</script>

<style lang="postcss" module>
.home {
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding-bottom: 36px;
  @media (max-width: 768px) {
    gap: 16px;
    padding-bottom: 16px;
  }
}
</style>
