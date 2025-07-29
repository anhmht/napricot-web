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

definePageMeta({
  schemaOrg: {
    name: 'Napricot Eyelash Beauty',
    description: `Sign in to your Napricot account`
  }
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
