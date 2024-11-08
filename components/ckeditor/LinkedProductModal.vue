<template>
  <custom-modal
    v-model:open="open"
    title="Create product buy box"
    :loading="isLoading"
    :class="$style.root"
  >
  </custom-modal>
</template>

<script setup lang="ts">
defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const isLoading = ref<boolean>(false)
</script>

<style module lang="postcss"></style>
