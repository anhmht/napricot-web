<template>
  <div :class="$style.main">
    <h1>Welcome to my Vue app!</h1>
    <stripe-payment-form />
  </div>
</template>

<script setup lang="ts">
// const { status, data } = await useAsyncData(
//   'users',
//   () => {
//     return $userService.getUsers()
//   },
//   { server: false }
// )
// onMounted(async () => {
//   const data = await $userService.getUsers()
//   console.log(data)
// })

async function onChange(event: Event) {
  const files = (event.target as HTMLInputElement)?.files
  if (!files) return
}
</script>

<style lang="postcss" module>
.main {
  display: block;
}
</style>
