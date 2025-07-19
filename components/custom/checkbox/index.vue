<template>
  <div class="form-group" :class="{ 'hide-required': !showRequired }">
    <label :for="inputId" class="checkbox-wrapper">
      <input
        :id="inputId"
        :checked="modelValue"
        :name="name"
        type="checkbox"
        class="checkbox-input"
        @change="handleChange"
        v-bind="$attrs"
      />
      <span class="checkbox-custom"></span>
      <span class="checkbox-label">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  name: string
  label: string
  showRequired?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  showRequired: false,
  id: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Generate unique ID if not provided
const inputId = computed(() => {
  return props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style scoped>
.form-group {
  position: relative;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--color-text);
  line-height: 1.4;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-custom {
  position: relative;
  height: 20px;
  width: 20px;
  border-radius: 2px;
  background: white;
  transition: all 0.2s ease;
  outline: 1px solid var(--color-grayscale-40);
}

.checkbox-custom::after {
  content: '';
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-input:checked ~ .checkbox-custom {
  background: var(--color-primary);
  outline-color: var(--color-primary);
}

.checkbox-input:checked ~ .checkbox-custom::after {
  display: block;
}

.checkbox-label {
  flex: 1;
  margin-left: 1rem;
}

/* Hover effects */
.checkbox-wrapper:hover .checkbox-custom {
  border-color: var(--color-primary);
}

/* Disabled state */
.checkbox-input:disabled ~ .checkbox-custom {
  background: var(--color-bg-disabled);
  border-color: var(--color-grayscale-40);
  cursor: not-allowed;
}

.checkbox-input:disabled ~ .checkbox-label {
  color: var(--color-grayscale-60);
  cursor: not-allowed;
}

.checkbox-input:disabled:checked ~ .checkbox-custom {
  background: var(--color-grayscale-60);
}

/* Responsive */
@media (max-width: 768px) {
  .checkbox-wrapper {
    font-size: 1.3rem;
  }

  .checkbox-custom {
    height: 18px;
    width: 18px;
  }

  .checkbox-custom::after {
    left: 5px;
    top: 1px;
    width: 3px;
    height: 8px;
  }
}
</style>
