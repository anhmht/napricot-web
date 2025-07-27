<template>
  <div :class="$style.signIn">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb :links="[{ name: 'Sign in', path: '/sign-in' }]" />
      </div>
    </div>
    <div class="container">
      <div :class="$style.wrapper">
        <sign-in-form />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})
defineOgImageComponent('DefaultOg')

useServerSeoMeta({
  title: () => `Sign in`,
  description: () => `Sign in to your Napricot account`,
  ogTitle: () => `Sign in`,
  ogSiteName: () => 'Napricot Eyelash Beauty',
  ogDescription: () => `Sign in to your Napricot account`
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Napricot Eyelash Beauty',
        description: `Sign in to your Napricot account`,
        url: `https://napricot.com/sign-in`,
        inLanguage: 'en-US'
      })
    }
  ]
})
</script>

<style lang="postcss" module>
.signIn {
  position: relative;
}
.breadcrumb {
  background-color: var(--color-background);
  color: var(--color-icon);
  padding: 8px 0;
}
.wrapper {
  padding: 36px 0;
  padding-bottom: 150px;
  display: flex;
  justify-content: center;
}
</style>
