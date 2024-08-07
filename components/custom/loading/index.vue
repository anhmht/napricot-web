<template>
  <div :class="$style.loading">
    <svg
      :class="$style.circular"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      :style="{
        animationName: 'loading-rotate',
        width: size,
        height: size
      }"
    >
      <circle
        :class="$style.path"
        :style="{
          animationName: 'loading-dash',
          stroke: color
        }"
        cx="25"
        cy="25"
        r="20"
        fill="none"
      ></circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 20
  },
  color: {
    type: String,
    default: 'var(--color-icon)'
  }
})
</script>

<style lang="postcss" module>
.loading {
  display: flex;
}
.circular {
  animation: 2s linear infinite;
}
.path {
  animation: 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke-linecap: round;
}
</style>
<style>
@keyframes loading-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }

  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
