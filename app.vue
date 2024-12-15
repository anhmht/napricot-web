<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { connect } = useWebSocket('wss://localhost:6002')
onMounted(() => {
  connect()
})
</script>
