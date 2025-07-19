<template>
  <div class="form-group">
    <label :for="label" v-if="label">{{ label }}</label>
    <div class="textarea-wrapper">
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rows="rows"
        :cols="cols"
        :maxlength="maxlength"
        :class="{ error: hasError }"
        :style="{ resize: resize }"
        @input="handleInput"
        @blur="handleBlur"
        @keyup.enter="$emit('keyup')"
      ></textarea>
      <div v-if="showCharCount && maxlength" class="char-count">
        {{ modelValue.length }}/{{ maxlength }}
      </div>
    </div>
    <Transition name="error-slide">
      <div v-if="internalErrorMessage" class="field-error">
        {{ internalErrorMessage }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  id?: string
  validator?: (value: string) => string
  rows?: number
  cols?: number
  maxlength?: number
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  showCharCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  required: false,
  disabled: false,
  errorMessage: '',
  validator: undefined,
  rows: 4,
  cols: undefined,
  maxlength: undefined,
  resize: 'vertical',
  showCharCount: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  input: [event: Event]
  keyup: []
}>()

// Internal validation error state
const internalErrorMessage = ref('')

const hasError = computed(() => {
  return !!internalErrorMessage.value || !!props.errorMessage
})

// Validation function
const validateField = () => {
  if (props.validator) {
    internalErrorMessage.value = props.validator(props.modelValue)
    return internalErrorMessage.value
  }
  return ''
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', event)

  // Real-time validation on input
  if (props.validator) {
    nextTick(() => {
      validateField()
    })
  }
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)

  // Real-time validation on blur
  if (props.validator) {
    validateField()
  }
}

// Watch for changes in props.errorMessage
watch(
  () => props.errorMessage,
  (newMessage) => {
    internalErrorMessage.value = newMessage
  }
)

// Expose functions to parent component
defineExpose({
  validateField,
  clearError: () => {
    internalErrorMessage.value = ''
  }
})
</script>

<style scoped>
.form-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.form-group label {
  color: var(--color-text);
  font-weight: 450;
  font-size: 1.6rem;
}

.textarea-wrapper {
  position: relative;
}

.form-group textarea {
  width: 100%;
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--color-grayscale-40);
  border-radius: 2px;
  font-size: 1.6rem;
  transition: all 0.2s ease;
  background: white;
  color: var(--color-text);
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1.5;
  min-height: 4rem;
}

.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group textarea:disabled {
  background: var(--color-bg-disabled);
  cursor: not-allowed;
  opacity: 0.7;
}

.form-group textarea.error {
  border-color: var(--color-error);
  border-width: 1px;
}

.char-count {
  position: absolute;
  bottom: 0.8rem;
  right: 1.2rem;
  font-size: 1.2rem;
  color: var(--color-grayscale-60);
  background: white;
  padding: 0 0.4rem;
  pointer-events: none;
}

.field-error {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  color: var(--color-error);
  font-size: 1.3rem;
  font-weight: 400;
  margin-top: 0.2rem;
  z-index: 1;
}

/* Transition styles for slide-down effect */
.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .form-group textarea {
    padding: 1rem 1.4rem;
  }

  .char-count {
    bottom: 0.6rem;
    right: 1rem;
    font-size: 1.1rem;
  }
}
</style>
