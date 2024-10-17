<template>
  <div>
    <NuxtLayout>
      <div :class="$style.error">
        <template v-if="error?.statusCode === 404">
          <error-404 />
        </template>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const error = useError()

const handleError = () => {
  clearError({
    redirect: '/dashboard'
  })
}
</script>

<style lang="postcss" module>
.error {
  position: relative;
}
</style>
