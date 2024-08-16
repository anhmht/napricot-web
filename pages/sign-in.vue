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
  middleware: 'auth'
  // layout: false
})
const user = ref<string | null>('null')
if (import.meta.client) {
  user.value = window.localStorage.getItem('user')
}
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
