<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      'btn',
      `btn--${level}`,
      {
        'btn--loading': loading,
        'btn--full-width': fullWidth
      }
    ]"
    @click="handleClick"
  >
    <span v-if="loading" class="btn__loading-content">
      <div class="btn__spinner"></div>
      <span>{{ loadingText }}</span>
    </span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  level: {
    type: String as PropType<'default' | 'primary' | 'secondary'>,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  fullWidth: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    event.preventDefault()
    emit('click', event)
  }
}
</script>

<style lang="postcss" scoped>
.btn {
  padding: 1.2rem 2.4rem;
  border-radius: 2px;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'SVN-Circular', sans-serif;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  outline: none;
  gap: 0.8rem;
}

.btn--loading {
  cursor: not-allowed;
}

.btn__loading-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.btn__spinner {
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: btn-spin 1s linear infinite;
}

.btn--default .btn__spinner {
  border: 2px solid var(--color-grayscale-40);
  border-top: 2px solid var(--color-text);
}

@keyframes btn-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.btn--full-width {
  width: 100%;
}

/* Default variant */
.btn--default {
  color: var(--color-text);
  border: 1px solid var(--color-grayscale-40);
  background: white;
}

.btn--default:hover:not(:disabled):not(.btn--loading) {
  opacity: 0.6;
}

.btn--default:disabled,
.btn--default.btn--loading {
  cursor: not-allowed;
  background: var(--color-grayscale-40);
  color: var(--color-text);
  opacity: 0.7;
}

/* Primary variant */
.btn--primary {
  background: var(--color-primary);
  color: white;
  border: none;
}

.btn--primary:hover:not(:disabled):not(.btn--loading) {
  background: var(--color-primary-light);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(236, 88, 37, 0.3);
}

.btn--primary:active:not(:disabled):not(.btn--loading) {
  transform: translateY(0);
}

.btn--primary:disabled,
.btn--primary.btn--loading {
  background: var(--color-grayscale-40);
  color: #fff;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Responsive */
@media (max-width: 768px) {
  .btn {
    padding: 1rem 2rem;
    font-size: 1.4rem;
  }
}
</style>
