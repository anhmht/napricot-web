<template>
  <div :class="$style.forgotPass">
    <NuxtLayout name="default">
      <template #breadcrumb>
        <div :class="$style.breadcrumb">
          <div class="container">
            <breadcrumb
              :links="[{ name: 'Forgot password', path: '/forgot-password' }]"
            />
          </div>
        </div>
      </template>
      <div :class="$style.wrapper">
        <forgot-password />
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
.forgotPass {
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
