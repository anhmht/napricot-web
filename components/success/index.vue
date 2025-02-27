<template>
  <div :class="$style.root">
    <div :class="$style.header">
      <div :class="$style.icon">
        <span class="icon-done" />
      </div>
    </div>
    <h4>Success!!</h4>
    <p>{{ message }}</p>
    <slot />
  </div>
</template>
<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true
  }
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style lang="postcss" module>
.root {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 50%;
  text-align: center;
}
.header {
  display: flex;
  justify-content: center;
}
.icon {
  padding: 14px 16px;
  border: 4px solid #2db224;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 5rem;
    color: #2db224;
  }
}
</style>
