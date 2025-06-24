<template>
  <div>
    <NuxtLoadingIndicator
      :height="4"
      :duration="2000"
      :throttle="200"
      color="#ec5825"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { connect } = useWebSocket()
onMounted(() => {
  connect()
})
</script>
