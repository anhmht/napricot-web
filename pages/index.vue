<template>
  <div :class="$style.main">
    <h1>Welcome to my Vue app!</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  data() {
    return {
      message: 'Hello, world!'
    }
  }
})
</script>

<style lang="postcss" module>
.main {
}
</style>
