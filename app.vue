<template>
  <div>
    <NuxtLoadingIndicator
      :height="4"
      :duration="2000"
      :throttle="200"
      color="#ec5825"
    />

    <!-- Loading overlay -->
    <div v-show="loading" :class="$style.loadingOverlay">
      <div :class="$style.loadingSpinner"></div>
      <p>Loading...</p>
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { loading } = useLoading()
</script>

<style lang="postcss" module>
.loadingOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 9999;
}

.loadingSpinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #ec5825;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loadingOverlay p {
  color: #64748b;
  font-size: 1.4rem;
  margin: 0;
}
</style>
