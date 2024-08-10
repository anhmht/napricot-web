<template>
  <div :class="$style.emailVerification">
    <NuxtLayout name="default">
      <template #breadcrumb>
        <div :class="$style.breadcrumb">
          <div class="container">
            <breadcrumb
              :links="[
                { name: 'Email Verification', path: '/email-verification' }
              ]"
            />
          </div>
        </div>
      </template>
      <div :class="$style.wrapper">
        <email-verification />
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
.emailVerification {
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
