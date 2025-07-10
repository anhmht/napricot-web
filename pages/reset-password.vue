<template>
  <div :class="$style.resetPass">
    <div :class="$style.breadcrumb">
      <div class="container">
        <breadcrumb
          :links="[{ name: 'Reset password', path: '/reset-password' }]"
        />
      </div>
    </div>
    <div class="container">
      <div :class="$style.wrapper">
        <reset-password />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})
</script>

<style lang="postcss" module>
.resetPass {
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
