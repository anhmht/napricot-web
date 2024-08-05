<template>
  <div :class="$style.signIn">
    <NuxtLayout name="default">
      <template #breadcrumb>
        <div :class="$style.breadcrumb">
          <div class="container">
            <breadcrumb :links="[{ name: 'Sign in', path: '/sign-in' }]" />
          </div>
        </div>
      </template>
      <div :class="$style.wrapper">
        <sign-in-form />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
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
